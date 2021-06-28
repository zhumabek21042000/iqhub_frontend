// const A = ["ROLE_ADMIN", "ROLE_MODERATOR", "ROLE_USER"];
// const B = ["ROLE_USER", "ROLE_ADMIN"];


// const diff = A.filter(x => !B.includes(x) );

// console.log(diff);
// const user_roles = [{id:0, role:"ROLE_ADMIN", authority:"ROLE_ADMIN"}]
// const all_roles = [{id:0, role:"ROLE_ADMIN", authority:"ROLE_ADMIN"},
// {id:2, role:"ROLE_USER", authority:"ROLE_USER"},
// {id:3, role:"ROLE_MODER", authority:"ROLE_MODER"}]
// function comparer(otherArray){
//     return function(current){
//         return otherArray.filter(function(other){
//         return other.id == current.id && other.role == current.role
//         }).length == 0;
//     }
//     }

//     var onlyInA = user_roles.filter(comparer(all_roles));
//     var onlyInB = all_roles.filter(comparer(user_roles));

//     const result = onlyInA.concat(onlyInB);
//     console.log(result);

// const url = "https://www.youtube.com/watch?v=dasdSfewds";
// if(url.substr(0, 32) === "https://www.youtube.com/watch?v="){
//             var short_url = url.substr(32, url.length);
//             let url2 = "https://www.youtube.com/embed/";
//             url2 = url2.concat(short_url);
//             console.log( url2);
//         }
// var short_url = url.substr(17, url.length);
// let url2 = "https://www.youtube.com/embed/";
// if (short_url.indexOf('&') > -1)
// {
// short_url = short_url.substr(0, short_url.indexOf('&'));
// }
// url2 = url2.concat(short_url);
// console.log(url2)
// let url2 = "https://www.youtube.com/embed/";
// if (short_url.indexOf('&') > -1)
// {
//   short_url = short_url.substr(0, short_url.indexOf('&'));
// }
// url2 = url2.concat(short_url);
// console.log(url2)

// const stringw = '   Hello World   ';
// console.log(stringw.replace(/ /g,''));

var courses = [
    {"id":1, "name":"test"},
    {"id":2, "name":"llll"}
]
for(let i = 0; i <courses.length;i++){
    //  alert(response.data.enrolledCourses[i].id+" = "+props.id)
    console.log(courses[i].id)
    if(courses[i].id === 2){
        console.log(true)
    }
  
   }