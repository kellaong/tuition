export function FuncArrayObjectToArray(arr:any[],ArrFieldName:string){
  let resultArr:[] =[];         
  for(var index in arr)
  { 
    // console.log(teacherRes[index].teacherId);
    eval("resultArr.push(arr[index]."+ArrFieldName+");");
  }
  return resultArr;
}


/*

[{"teacherId":"3"},{"teacherId":"2"}]

{"teacherId":["3","2"]}


[{"studEmail":"commonstudent1@gmail.com"},{"studEmail":"commonstudent2@gmail.com"}]
{"students":["commonstudent1@gmail.com","commonstudent2@gmail.com"]

teacherRes["teacherId"]
*/