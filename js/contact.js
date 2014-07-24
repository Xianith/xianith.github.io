function validateForm() {
    var x = document.forms[0]["FirstName"].value;

	    if (x == null || x == "") {
	        alert("First name must be filled out");
	        return false;
	       	if (isNaN(x) == true) {
	       		alert("First name may only contain characters.123123");
	       		retyrb false;
	       	}
	    }
	}
}