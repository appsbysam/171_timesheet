const SUPABASE_URL="https://cebgyyairqctbgrocxgl.supabase.co";
const SUPABASE_PUBLISHABLE_KEY="sb_publishable_VFT7GrL1rJtmV0hv0CPrlg_qjZXq4PT";
const db=window.supabase.createClient(SUPABASE_URL,SUPABASE_PUBLISHABLE_KEY);

const days=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const timesheet=document.getElementById("timesheet");
const template=document.getElementById("dayTemplate");
const weekStart=document.getElementById("weekStart");
const weekEnd=document.getElementById("weekEnd");
const statusEl=document.getElementById("status");

let saveTimer=null;
let isLoading=false;

function setStatus(message,isError=false){
  statusEl.textContent=message;
  statusEl.classList.toggle("error",isError);
}

const saveBtn=document.getElementById("saveBtn");

function setSaveButtonState(state){
  saveBtn.classList.remove("is-ready","is-saving","is-saved","is-error");

  if(state==="ready"){
    saveBtn.classList.add("is-ready");
    saveBtn.disabled=false;
    saveBtn.textContent="Save";
  }else if(state==="saving"){
    saveBtn.classList.add("is-saving");
    saveBtn.disabled=true;
    saveBtn.textContent="Saving…";
  }else if(state==="error"){
    saveBtn.classList.add("is-error");
    saveBtn.disabled=false;
    saveBtn.textContent="Retry Save";
  }else{
    saveBtn.classList.add("is-saved");
    saveBtn.disabled=true;
    saveBtn.textContent="✓ Saved";
  }
}

function makeTimeOptions(startMinutes,endMinutes){
  const options=[];
  for(let minutes=startMinutes;minutes<=endMinutes;minutes+=30){
    const hour24=Math.floor(minutes/60);
    const mins=minutes%60;
    const suffix=hour24<12?"am":"pm";
    const hour12=hour24%12===0?12:hour24%12;
    options.push({
      value:`${String(hour24).padStart(2,"0")}:${String(mins).padStart(2,"0")}`,
      label:`${hour12}:${String(mins).padStart(2,"0")} ${suffix}`
    });
  }
  return options;
}

function getTimeOptions(day,type){
  const isSaturday=day==="Saturday";
  if(type==="start"){
    return isSaturday ? makeTimeOptions(390,600) : makeTimeOptions(300,660);
  }
  return isSaturday ? makeTimeOptions(480,780) : makeTimeOptions(480,900);
}

function populateSelect(select,options){
  select.innerHTML='<option value="">Select</option>';
  options.forEach(option=>{
    const el=document.createElement("option");
    el.value=option.value;
    el.textContent=option.label;
    select.appendChild(el);
  });
}

function build(){
  days.forEach(day=>{
    const node=template.content.cloneNode(true);
    const block=node.querySelector(".day-block");
    block.dataset.day=day;
    node.querySelector("h2").textContent=day.toUpperCase();

    node.querySelectorAll(".shift-row").forEach(row=>{
      const employee=row.dataset.employee;
      const start=row.querySelector(".start");
      const finish=row.querySelector(".finish");

      populateSelect(start,getTimeOptions(day,"start"));
      populateSelect(finish,getTimeOptions(day,"finish"));

      start.setAttribute("aria-label",`${day} ${employee} start`);
      finish.setAttribute("aria-label",`${day} ${employee} finish`);

      row.querySelectorAll("select").forEach(select=>{
        select.addEventListener("change",()=>{
          calculateRow(row);
          calculateTotals();
          scheduleSave();
        });
      });
    });

    timesheet.appendChild(node);
  });
}

function minutes(value){
  if(!value)return null;
  const [h,m]=value.split(":").map(Number);
  return h*60+m;
}

function formatDecimal(totalMinutes){
  return (totalMinutes/60).toFixed(2);
}

function calculateRow(row){
  const startSelect=row.querySelector(".start");
  const finishSelect=row.querySelector(".finish");
  const start=minutes(startSelect.value);
  const finish=minutes(finishSelect.value);
  let total=0;

  startSelect.classList.remove("invalid");
  finishSelect.classList.remove("invalid");

  if(start!==null&&finish!==null){
    total=finish-start;
    if(total<0||total>630){
      startSelect.classList.add("invalid");
      finishSelect.classList.add("invalid");
      total=0;
    }
  }

  row.dataset.minutes=total;
  row.querySelector(".row-total").textContent=formatDecimal(total);
  row.classList.toggle("completed",start!==null&&finish!==null&&finish>=start);
}

function calculateTotals(){
  const totals={Mikayla:0,Monique:0};
  document.querySelectorAll(".shift-row").forEach(row=>{
    totals[row.dataset.employee]+=Number(row.dataset.minutes||0);
  });

  document.getElementById("michaelaTotal").textContent=formatDecimal(totals.Mikayla);
  document.getElementById("moniqueTotal").textContent=formatDecimal(totals.Monique);
  document.getElementById("weekTotal").textContent=formatDecimal(totals.Mikayla+totals.Monique);
}

function updateWeekEnd(){
  if(!weekStart.value){
    weekEnd.value="";
    return;
  }
  const d=new Date(`${weekStart.value}T12:00:00`);
  d.setDate(d.getDate()+5);
  weekEnd.value=d.toISOString().slice(0,10);
}

function managerMetadata(){
  return JSON.stringify({
    managerNotes:document.getElementById("managerNotes").value,
    managerName:document.getElementById("managerName").value,
    managerDate:document.getElementById("managerDate").value
  });
}

function collectRows(){
  const rows=[];
  const notes=managerMetadata();

  document.querySelectorAll(".day-block").forEach(block=>{
    block.querySelectorAll(".shift-row").forEach(row=>{
      rows.push({
        week_start:weekStart.value,
        employee:row.dataset.employee,
        day:block.dataset.day,
        start_time:row.querySelector(".start").value||null,
        finish_time:row.querySelector(".finish").value||null,
        hours:Number(row.dataset.minutes||0)/60,
        notes
      });
    });
  });

  return rows;
}

function scheduleSave(){
  if(isLoading||!weekStart.value)return;
  clearTimeout(saveTimer);
  setSaveButtonState("ready");
  setStatus("Unsaved changes…");
  saveTimer=setTimeout(()=>save(false),700);
}

async function save(show=true){
  if(!weekStart.value)return;

  clearTimeout(saveTimer);
  const rows=collectRows();

  try{
    setSaveButtonState("saving");
    setStatus("Saving…");

    const {error:deleteError}=await db
      .from("timesheets")
      .delete()
      .eq("week_start",weekStart.value);

    if(deleteError)throw deleteError;

    const {error:insertError}=await db
      .from("timesheets")
      .insert(rows);

    if(insertError)throw insertError;

    setSaveButtonState("saved");
    setStatus(show?"All changes saved online.":"All changes saved.");
    setTimeout(()=>{
      if(statusEl.textContent==="All changes saved."||statusEl.textContent==="All changes saved online.")setStatus("");
    },1800);
  }catch(error){
    console.error(error);
    setSaveButtonState("error");
    setStatus(`Save failed: ${error.message}`,true);
  }
}

function clearForm(){
  document.querySelectorAll(".shift-row select").forEach(select=>select.value="");
  document.querySelectorAll(".shift-row").forEach(calculateRow);
  document.getElementById("managerNotes").value="";
  document.getElementById("managerName").value="";
  calculateTotals();
}

async function load(){
  if(!weekStart.value)return;

  isLoading=true;
  clearForm();
  setSaveButtonState("saving");
  setStatus("Loading…");

  try{
    const {data,error}=await db
      .from("timesheets")
      .select("*")
      .eq("week_start",weekStart.value);

    if(error)throw error;

    if(data&&data.length){
      let metadata={};
      try{ metadata=JSON.parse(data[0].notes||"{}"); }catch{}

      document.getElementById("managerNotes").value=metadata.managerNotes||"";
      document.getElementById("managerName").value=metadata.managerName||"";
      document.getElementById("managerDate").value=metadata.managerDate||document.getElementById("managerDate").value;

      data.forEach(record=>{
        const block=[...document.querySelectorAll(".day-block")]
          .find(item=>item.dataset.day===record.day);
        if(!block)return;

        const row=[...block.querySelectorAll(".shift-row")]
          .find(item=>item.dataset.employee===record.employee);
        if(!row)return;

        row.querySelector(".start").value=record.start_time||"";
        row.querySelector(".finish").value=record.finish_time||"";
        calculateRow(row);
      });
    }

    calculateTotals();
    setSaveButtonState("saved");
    setStatus(data&&data.length?"Loaded online.":"New week—no saved entries yet.");
    setTimeout(()=>setStatus(""),1800);
  }catch(error){
    console.error(error);
    setSaveButtonState("error");
    setStatus(`Load failed: ${error.message}`,true);
  }finally{
    isLoading=false;
  }
}

weekStart.addEventListener("change",async()=>{
  updateWeekEnd();
  await load();
});

["managerNotes","managerName","managerDate"].forEach(id=>{
  document.getElementById(id).addEventListener("input",scheduleSave);
});

document.getElementById("saveBtn").addEventListener("click",()=>save(true));
document.getElementById("printBtn").addEventListener("click",()=>window.print());

document.getElementById("resetBtn").addEventListener("click",async()=>{
  if(!confirm("Clear all entries for this week?"))return;

  try{
    setStatus("Clearing…");
    const {error}=await db
      .from("timesheets")
      .delete()
      .eq("week_start",weekStart.value);
    if(error)throw error;

    clearForm();
    setSaveButtonState("saved");
    setStatus("Week cleared online.");
    setTimeout(()=>setStatus(""),1800);
  }catch(error){
    console.error(error);
    setSaveButtonState("error");
    setStatus(`Clear failed: ${error.message}`,true);
  }
});


function changeWeek(daysToAdd){
  if(!weekStart.value)return;

  const date=new Date(`${weekStart.value}T12:00:00`);
  date.setDate(date.getDate()+daysToAdd);
  weekStart.value=date.toISOString().slice(0,10);
  updateWeekEnd();
  load();
}

document.getElementById("previousWeekBtn").addEventListener("click",()=>changeWeek(-7));
document.getElementById("nextWeekBtn").addEventListener("click",()=>changeWeek(7));

build();

const today=new Date();
const monday=new Date(today);
const day=monday.getDay();
monday.setDate(monday.getDate()+(day===0?-6:1-day));

weekStart.value=monday.toISOString().slice(0,10);
document.getElementById("managerDate").value=today.toISOString().slice(0,10);

updateWeekEnd();
calculateTotals();
setSaveButtonState("saved");
load();
