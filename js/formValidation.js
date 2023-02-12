var nameErorr = document.getElementById("name-error");
var emailErorr = document.getElementById("email-error");
var messageErorr = document.getElementById("message-error");
var submitEroor = document.getElementById("subit-error");
var subjectEror = document.getElementById("subject");


function validateName(){
    var name= document.getElementById("contact-name").value;
    if(name.length == 0){
        nameErorr.innerHTML= 'Name is Required';
        return false;
    }
    else if(!name.match(/^[A-Za-z]*\s{1}[A-Za-z]*$/)){
        nameErorr.innerHTML='Write Full Name';
        return false;
    }
    else
    nameErorr.innerHTML='<i class="fa-solid fa-circle-check"></i>';
    return true;

}


// function validatePhone(){
//     var phone = document.getElementById('contact-phone').value;
//     if(phone.length == 0){
//         phoneErorr.innerHTML='Phone No is Required';
//         return false;
//     }
//     else if(phone.length !== 10){
//         phoneErorr.innerHTML="Phone No shoud be 10 digits";
//         return false;
//     }
//     else if(!phone.match(/^[0-9]{10}$/)){
//         phoneErorr.innerHTML ='Only 10 digits are Required';
//         return false;
//     }
//     else{
//         phoneErorr.innerHTML='<i class="fa-solid fa-circle-check"></i>';
//         return true;
//     }
// }

function validateEmail(){

    var Email = document.getElementById('contact-email').value;
    if(Email.length == 0){
        emailErorr.innerHTML='Email is Required';
        return false;
    }
    else if(!Email.match(/^[A-Za-z\._\-[0-9]*[@][A-Za-z]*[\.][a-z]{2,4}$/)){
        emailErorr.innerHTML='Email Invalid'
        return false;
    }
    else{
    emailErorr.innerHTML ='<i class="fa-solid fa-circle-check"></i>'
    return true;
    }
}

function validateMessage(){
    var Message1 = document.getElementById("contact-message").value;
    var Required = 30;
    var left = Required - Message1.length;
    if(left > 0){
        messageErorr.innerHTML = left + 'More Character Required';
        retrun = false;
    }
    else{
    messageErorr.innerHTML = '<i class="fa-solid fa-circle-check"></i>'
    return true;
    }
}

function validateSubject(){
    var Message1 = document.getElementById("subject-feild").value;
    var Required = 8;
    var left = Required - Message1.length;
    if(left > 0){
        subjectEror.innerHTML = left + 'More Character Required';
        retrun = false;
    }
    else{
        subjectEror.innerHTML = '<i class="fa-solid fa-circle-check"></i>'
    return true;
    }
}
















function validateForm(){
    if(!validateName() || !validateSubject() || !validateEmail() || ! validateMessage()){
       submitEroor.style.display ='block';
        submitEroor.innerHTML = 'Please Fix the Errors to submit';
        setTimeout(function(){
            submitEroor.style.display='none';
        }, 3000);
        return false;
    }
}