$(document).ready(function () {
    $('.delete-picture').on('click', function () {
        console.log($(this));
        var picture_path = $(this).data('id');
        var url = '/delete/' + picture_path;
        if (confirm('Delete Picture?')) {
            $.ajax({
                url: url,
                type: 'DELETE',
                success: function (data) {
                    console.log('Deleting Picture...');
                    window.location.href = '/';
                },
                error: function (err) { console.log(err); }
            });
        }
    });
});
