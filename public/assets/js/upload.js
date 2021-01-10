function convertBytes(input) {
  if (input <  999999) {
      input = input /  1000
      return(input.toFixed(2) + " KB ")
  } else if (input <  999999999 && input > 999999) {
      input = input /  1000000
      return(input.toFixed(2) + " MB ")
  } else if (input <  999999999999 && input > 999999999) {
      input = input /  1000000000
      return(input.toFixed(2) + " GB ")
  }
}

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
      url: '/api/uploadDir',
      type: 'POST',
      data: formData,
      processData: false,
      contentType: false,
      success: function(data){
          console.log('Upload successful!\n' + data);
      },
      xhr: function() {
      var xhr = new XMLHttpRequest();
      xhr.upload.addEventListener('progress', function(evt) {
          if (evt.lengthComputable) {
              console.log("Length Is computable!")
          var percentComplete = evt.loaded / evt.total;
          percentComplete = parseInt(percentComplete * 100);
          $('.progress-bar').text(`${percentComplete}% uploaded`);
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
  $('#upload-input-folder').click();
  $('.progress-bar').text('0%');
  $('.progress-bar').width('0%');
});

$('.upload-btn').on('click', function (){
  $('#upload-input-file').click();
  $('.progress-bar').text('0%');
  $('.progress-bar').width('0%');
});

$('#upload-input-file').on('change', function(){
  var files = $(this).get(0).files;
  if (files.length > 0){
  var formData = new FormData();
  for (var i = 0; i < files.length; i++) {
      var file = files[i];
      formData.append('uploads[]', file, file.name);
  }
  $.ajax({
      url: '/api/upload',
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
          $('#status').html(percentComplete + '% uploaded');
          $('#loaded_n_total').html(convertBytes(evt.loaded) + ' completed out of ' + convertBytes(evt.total));
          $('#progress-bar').val(percentComplete);
          } else {
              console.log("Else block entered")
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