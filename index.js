/* 
let x={
    name:"po",
    amount:98,
    type:"+"
}
let y={
    name:"p",
    amount:8,
    type:"-"
}
let arr =[];
arr.push(x);
arr.push(y);
arr.length=2;
arr[0]={name:"po",amount:98,type:"+"}

localStorage <any data type, any data type>
localStorage<String,String>
how can we convert any javascript variable into String
JSON.stringify( arr)
localStorage.setItem("budget",JSON.stringify( arr) )
localStorage.getItem("buget")=JSON.stringify( arr)->String type->
to convert in array-> JSON.parse(localStorage.getItem("buget"))


*/

const signs = document.getElementById("sign");
const descriptionHtml  = document.getElementById('description');
const valueHtml = document.getElementById('amount');
const addBtn=document.getElementById("add-button");
const incomeHTMLID=document.getElementById('top-income')
const expenseHTMLID=document.getElementById('top-expenses')
const leftBudgetHTMLID=document.getElementById('left-budget')


let arr=[] ;
let totalIncome=0;
let totalExpense=0;
let notation="+";

incomeHTMLID.innerText=0;
expenseHTMLID.innerText=0;


if(localStorage.getItem("budget")!=null){
    arr=JSON.parse(localStorage.getItem("budget"));
    for(let i=0;i<arr.length;i++){
        let obj =arr[i];
        const tr=document.createElement('tr');
    
        const tdincome=document.createElement('td');
        tdincome.innerText=obj.name;
        
        const tdvalue=document.createElement('td');
        tdvalue.innerText=obj.amount;
        
        tr.appendChild(tdincome);
        tr.appendChild(tdvalue);
    
        if(obj.type==="+"){
            const salary=document.getElementById('salary');
            salary.appendChild(tr);
            totalIncome+=parseInt(obj.amount);
        }
        else{
            const spent=document.getElementById('spent');
            spent.appendChild(tr);
            totalExpense+=parseInt(obj.amount);
        }
    }

    incomeHTMLID.innerText=totalIncome;
    expenseHTMLID.innerText=totalExpense;

    
}

leftBudgetHTMLID.innerText=(totalIncome-totalExpense);

signs.addEventListener("change", function(e) { 
        notation=signs.value;
        if(notation==="+"){
            signs.style.border="3px solid red";
        }
        else{
            signs.style.border="3px solid blue";
        }
        e.preventDefault();
});


addBtn.addEventListener("click",function(e){
    const name=descriptionHtml.value;
    const amount=valueHtml.value;
    add(name,amount);
    descriptionHtml.value="";
    valueHtml.value="";
    e.preventDefault();
})


function add(name, value){
    let x={
        name:name,
        amount:value,
        type:notation
    }
    arr.push(x);
    localStorage.setItem("budget",JSON.stringify(arr));


    const tr=document.createElement('tr');
    
    const tdincome=document.createElement('td');
    tdincome.innerText=name;
    
    const tdvalue=document.createElement('td');
    tdvalue.innerText=value;
    
    tr.appendChild(tdincome);
    tr.appendChild(tdvalue);

    if(notation==="+"){
        const salary=document.getElementById('salary');
        salary.appendChild(tr);
        totalIncome+=parseInt(value);
        incomeHTMLID.innerText=totalIncome;
    }
    else{
        const spent=document.getElementById('spent');
        spent.appendChild(tr);
        totalExpense+=parseInt(value);
        expenseHTMLID.innerText=totalExpense;
    }
    leftBudgetHTMLID.innerText=(totalIncome-totalExpense);
    
}



