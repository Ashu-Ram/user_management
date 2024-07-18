$(document).ready(function() {

	// 1.Hide errror sections
	$("#firstNameError").hide();
	$("#lastNameError").hide();
	$("#phoneNoError").hide();

	// 2.Define errror variables

	var firstNameError = false;
	var lastNameError = false;
	var phoneNoError = false;


	// 3.Define validate functions

	function validate_firstName() {
		var val = $("#fname").val().trim();

		var exp = /^[a-zA-Z\s]+$/;
		if (val == '') {
			$("#firstNameError").show();
			$("#firstNameError").html("*Please Enter First <b>Name</b>");
			$("#firstNameError").css('color', 'red')
			firstNameError = false;

		}
		else if (!exp.test(val)) {
			$("#firstNameError").show();
			$("#firstNameError").html("*Please enter a valid first name (only alphabetic characters and spaces)");
			$("#firstNameError").css('color', 'red');
			firstNameError = false;
		}
		else {
			$("#firstNameError").hide();
			firstNameError = true;
		}
		return firstNameError;
	}



	function validate_lastName() {
		var val = $("#lastname").val().trim();

		var exp = /^[a-zA-Z\s]+$/;
		if (val == '') {
			$("#lastNameError").show();
			$("#lastNameError").html("*Please Enter Last <b>Name</b>");
			$("#lastNameError").css('color', 'red')
			lastNameError = false;

		}
		else if (!exp.test(val)) {
			$("#lastNameError").show();
			$("#lastNameError").html("*Please enter a valid last name (only alphabetic characters and spaces)");
			$("#lastNameError").css('color', 'red');
			lastNameError = false;
		}
		else {
			$("#lastNameError").hide();
			lastNameError = true;
		}
		return lastNameError;
	}



	function validate_phoneNo() {

		var val = $('#phone').val().trim();
		var exp = /^\d{10}$/;
		if (val == '') {
			$("#phoneNoError").show();
			$("#phoneNoError").html("*Please Enter <b>PhoneNo</b>");
			$("#phoneNoError").css('color', 'red')
			phoneNoError = false;
		} else if (!exp.test(val)) {
			$("#phoneNoError").show();
			$("#phoneNoError").html("*Please enter a valid 10-digit phone number");
			$("#phoneNoError").css('color', 'red');
			phoneNoError = false;
		}

		else {
			$("#phoneNoError").hide();
			phoneNoError = true;
		}
		return phoneNoError;
	}



	// 4.Link with action event

	$("#fname").keyup(function() {
		validate_firstName();

	});


	$("#lastname").keyup(function() {
		validate_lastName();
	});



	$("#phone").keyup(function() {
		validate_phoneNo();
	});

	// 5.On click form submit
	$("#adduser").submit(function() {
		validate_firstName();
		validate_lastName();
		validate_phoneNo();

		if (firstNameError && lastNameError && phoneNoError
		)
			return true;
		else return false;

	});

	$("#editUser").submit(function() {
		validate_firstName();
		validate_lastName();
		validate_phoneNo();

		if (firstNameError && lastNameError && phoneNoError
		)
			return true;
		else return false;

	});
});

$(document).ready(function() {
	$('.enable-checkbox').on('change', function() {
		const isChecked = $(this).prop('checked');
		const userId = $(this).data('id');
		const url = $(this).data('url');

		$.ajax({
			url: url,
			type: 'POST',
			contentType: 'application/json',
			data: JSON.stringify({ enabled: isChecked }),
			success: function(response) {
				// Find the  fname element
				const fnameElement = $(`a[data-id=${userId}]`);
				if (isChecked) {
					// If checked, enable the link
					fnameElement.removeClass('fname-link-disabled').addClass('fname-link').attr('href', `/users/${userId}`);
				} else {
					// If unchecked, disable the link
					fnameElement.removeClass('fname-link').addClass('fname-link-disabled').removeAttr('href');
				}
			},

		});
	});


});



