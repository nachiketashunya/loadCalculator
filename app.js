let loanForm = document.querySelector("#loan-form");

loanForm.addEventListener("submit", function(e) {
    //show loader 
    document.querySelector(".loader").style.display = "block";

    //hide results
    document.querySelector(".results").style.display = "none";

    e.preventDefault();

    setTimeout(calculateResults, 2000);
});

function calculateResults(){
    console.log("Form submitted");

    const amount = document.querySelector("#loan-amount");
    const interest = document.querySelector("#loan-interest");
    const time = document.querySelector("#repay-time")

    // queries to show results 
    const monthlyPayment = document.querySelector("#monthly-payment");
    const totalInterest = document.querySelector("#total-interest");
    const totalPayment = document.querySelector("#total-payment")

    // Calculate values
    const calculatedInterest = parseFloat(interest.value) / 100 / 12;
    const calculatedPayments = parseFloat(time.value) * 12
    const principal = parseFloat(amount.value);

    // Calculate monthly payments
    let x = Math.pow( 1 + calculatedInterest, calculatedPayments);
    let monthly = (principal * x * calculatedInterest) / (x - 1);

    console.log(principal, monthly);


    // Displaying results 
    if (isFinite(monthly)){
        monthlyPayment.value = monthly.toFixed(2);
        totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2);
        totalPayment.value = (monthly * calculatedPayments).toFixed(2);

        //hide loader 
        document.querySelector(".loader").style.display = "none";

        //show results
        document.querySelector(".results").style.display = "block";

    } else {
        showError("Please enter valid numbers");
    }

    loanForm.reset();
}

function showError(errorMsg){
    //hide loader 
    document.querySelector(".loader").style.display = "none";

    //hide results
    document.querySelector(".results").style.display = "none";

    let errorDiv = document.createElement("div");

    let heading = document.querySelector(".heading");

    errorDiv.className = "alert alert-danger";
    errorDiv.appendChild(document.createTextNode(errorMsg));

    heading.insertAdjacentElement("beforebegin", errorDiv);

    setTimeout( clearError, 3000);
}

function clearError(){
    document.querySelector(".alert").remove();
}