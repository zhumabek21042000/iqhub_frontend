// const A = ["ROLE_ADMIN", "ROLE_MODERATOR", "ROLE_USER"];
// const B = ["ROLE_USER", "ROLE_ADMIN"];


// const diff = A.filter(x => !B.includes(x) );

// console.log(diff);
const user_roles = [{id:0, role:"ROLE_ADMIN", authority:"ROLE_ADMIN"}]
const all_roles = [{id:0, role:"ROLE_ADMIN", authority:"ROLE_ADMIN"},
{id:2, role:"ROLE_USER", authority:"ROLE_USER"},
{id:3, role:"ROLE_MODER", authority:"ROLE_MODER"}]
function comparer(otherArray){
    return function(current){
        return otherArray.filter(function(other){
        return other.id == current.id && other.role == current.role
        }).length == 0;
    }
    }

    var onlyInA = user_roles.filter(comparer(all_roles));
    var onlyInB = all_roles.filter(comparer(user_roles));

    const result = onlyInA.concat(onlyInB);
    console.log(result);