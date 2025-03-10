﻿"use strict";

// Class definition
var KTUsersUpdateDetails = function () {
    // Shared variables
    const element = document.getElementById('kt_modal_update_classroom');
    //const form = element.querySelector('#kt_modal_update_user_form');
    const form = document.getElementById('kt_modal_update_classroom_form');
    const modal = new bootstrap.Modal(element);

    // Init add schedule modal
    var initUpdateDetails = () => {

        $('#ProductIds').select2();

        var validator = FormValidation.formValidation(
            form,
            {
                fields: {
                    'Name': {
                        validators: {
                            notEmpty: {
                                message: '<p>Sınıf Adı alanı zorunludur</p>'
                            }
                        }
                    },
                    'OpeningDate': {
                        validators: {
                            notEmpty: {
                                message: 'Açılış tarihi alanı zorunludur'
                            },
                            callback: {
                                message: 'Açılış tarihi kapanış tarihinden önce olmalıdır', // Açılış tarihinin kapanış tarihinden önce olma mesajı
                                callback: function (input) {
                                    const openingDate = new Date(input.value);
                                    const closedDateInput = form.querySelector('[name="ClosedDate"]');
                                    const closedDate = new Date(closedDateInput.value);

                                    // Eğer açılış tarihi boşsa veya kapanış tarihi geçerli değilse
                                    if (input.value === '' || isNaN(closedDate.getTime())) {
                                        return true;
                                    }

                                    // Saat değerlerini sıfırlayarak sadece tarih karşılaştırması yapmak
                                    openingDate.setHours(0, 0, 0, 0);
                                    closedDate.setHours(0, 0, 0,);

                                    if (openingDate < closedDate) { // Açılış tarihi kapanış tarihinden önce mi?
                                        return true;
                                    } else if (openingDate > closedDate) { // Açılış tarihi kapanış tarihinden sonra mı?
                                        return {
                                            valid: false,
                                            message: 'Açılış tarihi kapanış tarihinden önce olmalıdır' // Hata mesajı: Açılış tarihi kapanış tarihinden önce olmalıdır
                                        };
                                    } else {
                                        return {
                                            valid: false,
                                            message: 'Açılış tarihi kapanış tarihi ile eşit olmamalıdır' // Hata mesajı: Açılış tarihi kapanış tarihi ile eşit olmamalıdır
                                        }
                                    }
                                }
                            }
                        }
                    },
                    'ClosedDate': {
                        validators: {
                            notEmpty: {
                                message: 'Kapanış tarihi alanı zorunludur'
                            },
                            callback: {
                                message: 'Kapanış tarihi açılış tarihinden sonra olmalıdır', // Kapanış tarihinin açılış tarihinden sonra olma mesajı
                                callback: function (input) {
                                    const closedDate = new Date(input.value);
                                    const openingDateInput = form.querySelector('[name="OpeningDate"]');
                                    const openingDate = new Date(openingDateInput.value);

                                    // Eğer kapanış tarihi boşsa veya açılış tarihi geçerli değilse
                                    if (input.value === '' || isNaN(openingDate.getTime())) {
                                        return true;
                                    }

                                    // Saat değerlerini sıfırlayarak sadece tarih karşılaştırması yapmak
                                    closedDate.setHours(0, 0, 0, 0);
                                    openingDate.setHours(0, 0, 0, 0);

                                    if (closedDate > openingDate) { // Kapanış tarihi açılış tarihinden sonra mı?
                                        return true;
                                    } else if (closedDate < openingDate) { // Kapanış tarihi açılış tarihinden önce mi?
                                        return {
                                            valid: false,
                                            message: 'Kapanış tarihi açılış tarihinden sonra olmalıdır' // Hata mesajı: Kapanış tarihi açılış tarihinden sonra olmalıdır
                                        };
                                    } else {
                                        return {
                                            valid: false,
                                            message: 'Kapanış tarihi açılış tarihi ile eşit olmamalıdır' // Hata mesajı: Kapanış tarihi açılış tarihi ile eşit olmamalıdır 
                                        };
                                    }
                                }
                            }
                        }
                    },
                    'BranchId': {
                        validators: {
                            notEmpty: {
                                message: 'Şube alanı zorunludur'
                            }
                        }
                    },
                    'GroupTypeId': {
                        validators: {
                            notEmpty: {
                                message: 'Eğitim tipi alanı zorunludur'
                            }
                        }
                    },
                    'ProductIds': {
                        validators: {
                            notEmpty: {
                                message : 'Ürün alanı boş geçilemez'
                            }
                        }
                    }
                },

                plugins: {
                    trigger: new FormValidation.plugins.Trigger(),
                    bootstrap: new FormValidation.plugins.Bootstrap5({
                        rowSelector: '.fv-row',
                        eleInvalidClass: '',
                        eleValidClass: ''
                    })
                }
            }
        );

        // Close button handler
        const closeButton = element.querySelector('[data-kt-users-modal-action="closes"]');
        closeButton.addEventListener('click', e => {
            e.preventDefault();

            Swal.fire({
                title: localizedTexts.unsavedChangesTitle,
                text: localizedTexts.unsavedChangesText,
                icon: 'warning',
                showCancelButton: true,
                cancelButtonColor: '#3085d6',
                confirmButtonColor: '#d33',
                confirmButtonText: localizedTexts.confirmButtonText,
                cancelButtonText: localizedTexts.cancelButtonText
            }).then((result) => {
                if (result.isConfirmed) {
                    // Event handler'ı geçici olarak kaldır
                    $('#kt_modal_update_classroom').off('hide.bs.modal');
                    // Modalı kapat
                    $('#kt_modal_update_classroom').modal('hide');
                    // Modal tamamen kapandıktan sonra event handler'ı tekrar ekle
                    $('#kt_modal_update_classroom').on('hidden.bs.modal', function () {
                        addModalCloseConfirmation();
                        $(this).find('form').trigger('reset');
                    });
                }
            });
        });

        // Cancel button handler
        const cancelButton = element.querySelector('[data-kt-users-modal-action="cancels"]');
        cancelButton.addEventListener('click', e => {
            e.preventDefault();

            Swal.fire({
                title: localizedTexts.unsavedChangesTitle,
                text: localizedTexts.unsavedChangesText,
                icon: 'warning',
                showCancelButton: true,
                cancelButtonColor: '#3085d6',
                confirmButtonColor: '#d33',
                confirmButtonText: localizedTexts.confirmButtonText,
                cancelButtonText: localizedTexts.cancelButtonText
            }).then((result) => {
                if (result.isConfirmed) {
                    // Event handler'ı geçici olarak kaldır
                    $('#kt_modal_update_classroom').off('hide.bs.modal');
                    // Modalı kapat
                    $('#kt_modal_update_classroom').modal('hide');
                    // Modal tamamen kapandıktan sonra event handler'ı tekrar ekle
                    $('#kt_modal_update_classroom').on('hidden.bs.modal', function () {
                        addModalCloseConfirmation();
                        $(this).find('form').trigger('reset');
                    });
                }
            });
        });

        // Submit button handler
        const submitButton = element.querySelector('[data-kt-users-modal-action="submits"]');
        submitButton.addEventListener('click', function (e) {
            // Prevent default button action
            e.preventDefault();


            if (validator) {
                validator.validate().then(function (status) {
                    console.log('validated!');

                    if (status == 'Valid') {


                        // Show loading indication
                        submitButton.setAttribute('data-kt-indicator', 'on');

                        // Disable button to avoid multiple click 
                        submitButton.disabled = true;

                        // Simulate form submission. For more info check the plugin's official documentation: https://sweetalert2.github.io/
                        setTimeout(function () {

                            // Remove loading indication
                            submitButton.removeAttribute('data-kt-indicator');

                            // Enable button
                            submitButton.disabled = false;
                            // Show popup confirmation 
                            Swal.fire({
                                text: localizedTexts.formSubmittedText,
                                icon: "success",
                                buttonsStyling: false,
                                confirmButtonText: localizedTexts.okButtonText,
                                customClass: {
                                    confirmButton: "btn btn-primary"
                                }
                            }).then(function (result) {
                                if (result.isConfirmed) {
                                    modal.hide();
                                }
                            });

                            form.submit(); // Submit form
                        }, 2000);
                    }


                });
            }
        });
    }

    return {
        // Public functions
        init: function () {
            initUpdateDetails();
        }
    };
}();

async function loadClassroomData(id) {
    const form = document.getElementById('kt_modal_update_classroom_form');

    const classroom = await getClassroom(id);
    console.log('Classroom Data:', classroom);

    form.elements["Id"].value = classroom.id;
   
    form.elements["Name"].value = classroom.name;
    form.elements["OpeningDate"].value = classroom.openingDate.split("T")[0];
    form.elements["ClosedDate"].value = classroom.closedDate.split("T")[0];
    form.elements["BranchId"].value = classroom.branchId;
    form.elements["GroupTypeId"].value = classroom.groupTypeId;

    const productSelect = form.elements["ProductIds"];
    for (let option of productSelect.options) {
        option.selected = false;
    }

    for (let productId of classroom.productIds) {
        for (let option of productSelect.options) {
            if (option.value == productId) {
                option.selected = true;
                break;
            }
        }
    }
    const event = new Event('change');
    productSelect.dispatchEvent(event);
    

}
async function getClassroom(classroomId) {

    return $.ajax({
        url: '/Admin/Classroom/GetClassroom',
        data: { classroomId: classroomId }
    });
}
function addModalCloseConfirmation() {
    $('#kt_modal_update_classroom').on('hide.bs.modal', function (e) {
        e.preventDefault();
        showModalCloseConfirmation();
    });
}

// İlk yüklemede event handler'ı ekle
addModalCloseConfirmation();

$('#kt_modal_update_classroom').on('hidden.bs.modal', function () {
    $(this).find('form').trigger('reset');
});


// On document ready
KTUtil.onDOMContentLoaded(function () {
    KTUsersUpdateDetails.init();
});