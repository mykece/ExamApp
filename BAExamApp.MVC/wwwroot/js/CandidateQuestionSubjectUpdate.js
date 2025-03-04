$('#updateCandidateQuestionSubjectModal').on('show.bs.modal', function (event) {
    let button = $(event.relatedTarget);
    let subjectId = button.data('subject-id');
    let subjectName = button.data('subject-name');

    let modal = $(this);
    modal.find('input[name="Name"]').val(subjectName);
    modal.find('input[name="Id"]').val(subjectId);
});

// Alert
function showModalCloseConfirmation() {
    Swal.fire({
        title: updateActionLocalizedTexts.unsavedChangesTitle,
        text: updateActionLocalizedTexts.unsavedChangesText,
        icon: 'warning',
        showCancelButton: true,
        cancelButtonColor: '#3085d6',
        confirmButtonColor: '#d33',
        confirmButtonText: updateActionLocalizedTexts.confirmButtonText,
        cancelButtonText: updateActionLocalizedTexts.cancelButtonText,
        customClass: {
            confirmButton: "btn btn-primary",
            cancelButton: "btn btn-active-light"
        }
    }).then((result) => {
        if (result.isConfirmed) {
            // Event handler'� ge�ici olarak kald�r
            $('#updateCandidateQuestionSubjectModal').off('hide.bs.modal');
            // Modal� kapat
            $('#updateCandidateQuestionSubjectModal').modal('hide');
            // Modal tamamen kapand�ktan sonra event handler'� tekrar ekle
            $('#updateCandidateQuestionSubjectModal').on('hidden.bs.modal', function () {
                addModalCloseConfirmation();
                $(this).find('form').trigger('reset');
            });
        }
    });
}


function addModalCloseConfirmation() {
    $('#updateCandidateQuestionSubjectModal').on('hide.bs.modal', function (e) {
        e.preventDefault();
        showModalCloseConfirmation();
    });
}

// �lk y�klemede event handler'� ekle
addModalCloseConfirmation();

$('#updateCandidateQuestionSubjectModal').on('hidden.bs.modal', function () {
    $(this).find('form').trigger('reset');
});