function zipFiles(dom, e){
    let zip = new JSZip();
    var files = e.target.files
    var path = files[0].webkitRelativePath
    var folder = path.split("/")
    folder = folder[0] + ".zip"
  
    for(let f of dom.files){
        zip.file(f.webkitRelativePath, f);
    }
    
   zip.generateAsync({type:"blob"})
    .then(function (blob) {
      var formData = new FormData()
      formData.append('uploads[]', blob, folder)
      $.ajax({
        url: '/uploadDir',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function(data){
            console.log('upload successful!\n' + data);
        },
        xhr: function() {
          var xhr = new XMLHttpRequest();
          xhr.upload.addEventListener('progress', function(evt) {
            if (evt.lengthComputable) {
                console.log("cwce")
              var percentComplete = evt.loaded / evt.total;
              percentComplete = parseInt(percentComplete * 100);
              $('.progress-bar').text(percentComplete + '%');
              $('.progress-bar').width(percentComplete + '%');
              if (percentComplete === 100) {
                $('.progress-bar').html('Done');
              }
            }
          }, false);
          return xhr;
        }
      });
    });
  }
  $('.upload-btn-2').on('click', function (){
    $('#test').click();
    $('.progress-bar').text('0%');
    $('.progress-bar').width('0%');
  });
  
  $('.upload-btn').on('click', function (){
      $('#upload-input').click();
      $('.progress-bar').text('0%');
      $('.progress-bar').width('0%');
  });
  
  $('#upload-input').on('change', function(){
    var files = $(this).get(0).files;
    if (files.length > 0){
      var formData = new FormData();
      for (var i = 0; i < files.length; i++) {
        var file = files[i];
        formData.append('uploads[]', file, file.name);
      }
      $.ajax({
        url: '/uploadFile',
        type: 'POST',
        data: formData,
        processData: false,
        contentType: false,
        success: function(data){
            console.log('Upload successful! Server Response:' + data);
            $("#loader").addClass("hidden")
            $('#status').html('Completed');

        },
        xhr: function() {
          var xhr = new XMLHttpRequest();
          xhr.upload.onprogress = function(evt) {
            if (evt.lengthComputable) {
              var percentComplete = evt.loaded / evt.total;
              percentComplete = parseInt(percentComplete * 100);
              $("#progress-bar").removeClass("hidden")
              $("#status").removeClass("hidden")
              $("#loaded_n_total").removeClass("hidden")
              $('#status').html(percentComplete + '%');
              $('#loaded_n_total').html(evt.loaded + ' completed out of ' + evt.total);
              $('#progress-bar').val(percentComplete);
            } else {
                console.log("else block entered")
                do {
                    document.getElementById("loading").classList.remove("hidden")
                    $("#status").html("Uploading...")
                } while (5 > 2)
                
            }
        };
          return xhr;
        }
      });
    }
  });