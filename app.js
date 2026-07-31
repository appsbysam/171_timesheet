const days=["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];
const timesheet=document.getElementById("timesheet");
const template=document.getElementById("dayTemplate");
const weekStart=document.getElementById("weekStart");
const weekEnd=document.getElementById("weekEnd");
const statusEl=document.getElementById("status");

function makeTimeOptions(startMinutes,endMinutes){
  const options=[];
  for(let minutes=startMinutes;minutes<=endMinutes;minutes+=30){
    const hour24=Math.floor(minutes/60);
    const mins=minutes%60;
    const suffix=hour24<12?"am":"pm";
    const hour12=hour24%12===0?12:hour24%12;
    const label=`${hour12}:${String(mins).padStart(2,"0")} ${suffix}`;
    const value=`${String(hour24).padStart(2,"0")}:${String(mins).padStart(2,"0")}`;
    options.push({value,label});
  }
  return options;
}

function getTimeOptions(day,type){
  const isSaturday=day==="Saturday";

  if(type==="start"){
    return isSaturday
      ? makeTimeOptions(390,600)   // 6:30 am to 10:00 am
      : makeTimeOptions(300,660);  // 5:00 am to 11:00 am
  }

  return isSaturday
    ? makeTimeOptions(480,780)     // 8:00 am to 1:00 pm
    : makeTimeOptions(480,900);    // 8:00 am to 3:00 pm
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
          save(false);
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
  const s=row.querySelector(".start");
  const f=row.querySelector(".finish");
  const start=minutes(s.value);
  const finish=minutes(f.value);
  let total=0;

  s.classList.remove("invalid");
  f.classList.remove("invalid");

  if(start!==null&&finish!==null){
    total=finish-start;
    if(total<0 || total>630){
      s.classList.add("invalid");
      f.classList.add("invalid");
      total=0;
    }
  }

  row.dataset.minutes=total;
  row.querySelector(".row-total").textContent=formatDecimal(total);
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

function collect(){
  const shifts={};

  document.querySelectorAll(".day-block").forEach(block=>{
    shifts[block.dataset.day]={};

    block.querySelectorAll(".shift-row").forEach(row=>{
      shifts[block.dataset.day][row.dataset.employee]={
        start:row.querySelector(".start").value,
        finish:row.querySelector(".finish").value
      };
    });
  });

  return{
    weekStart:weekStart.value,
    managerNotes:document.getElementById("managerNotes").value,
    managerName:document.getElementById("managerName").value,
    managerDate:document.getElementById("managerDate").value,
    shifts
  };
}

function save(show=true){
  localStorage.setItem(storageKey(),JSON.stringify(collect()));

  if(show){
    statusEl.textContent="Saved on this device.";
    setTimeout(()=>statusEl.textContent="",1500);
  }
}

function load(){
  const raw=localStorage.getItem(storageKey());
  if(!raw)return;

  try{
    const data=JSON.parse(raw);
    document.getElementById("managerNotes").value=data.managerNotes||"";
    document.getElementById("managerName").value=data.managerName||"";
    document.getElementById("managerDate").value=data.managerDate||"";

    document.querySelectorAll(".day-block").forEach(block=>{
      block.querySelectorAll(".shift-row").forEach(row=>{
        const shift=data.shifts?.[block.dataset.day]?.[row.dataset.employee]||{};
        row.querySelector(".start").value=shift.start||"";
        row.querySelector(".finish").value=shift.finish||"";
        calculateRow(row);
      });
    });

    calculateTotals();
  }catch(e){
    console.error(e);
  }
}

weekStart.addEventListener("change",()=>{
  updateWeekEnd();
  load();
});

["managerNotes","managerName","managerDate"].forEach(id=>{
  document.getElementById(id).addEventListener("input",()=>save(false));
});

document.getElementById("saveBtn").addEventListener("click",()=>save(true));
document.getElementById("printBtn").addEventListener("click",()=>window.print());

document.getElementById("resetBtn").addEventListener("click",()=>{
  if(!confirm("Clear all entries for this week?"))return;

  localStorage.removeItem(storageKey());
  document.querySelectorAll(".shift-row select").forEach(select=>select.value="");
  document.querySelectorAll(".shift-row").forEach(calculateRow);
  document.getElementById("managerNotes").value="";
  document.getElementById("managerName").value="";
  calculateTotals();
  statusEl.textContent="Week cleared.";
});

build();

const today=new Date();
const monday=new Date(today);
const day=monday.getDay();
monday.setDate(monday.getDate()+(day===0?-6:1-day));

weekStart.value=monday.toISOString().slice(0,10);
document.getElementById("managerDate").value=today.toISOString().slice(0,10);

updateWeekEnd();
load();
calculateTotals();
