let todo=[];

let req= prompt("Enter a request: ");

while(true){
    if(req=="quite"){
        console.log("Quitting app");
        break;
    }
    if(req =="list" ){
        console.log("-------------");
        for(let i=0;i<todo.length;i++){
            console.log(i,todo[i]);
        }
        console.log("-------------");
    }else if(req=="add"){
        let task=prompt("please enter a task you want to add");
        todo.push(task);
        console.log("task added");
    }else if(req=="delete"){
         let indx=prompt("please enter a indx of task you want to delete");
         todo.splice(0,1);
         console.log("task deleted")
    }else{
        console.log("wrong request")
    }
    req= prompt("Enter a request: ");

}