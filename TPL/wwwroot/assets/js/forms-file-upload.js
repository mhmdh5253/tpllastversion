document.addEventListener('DOMContentLoaded', function() {
  var messages = {
      dictDefaultMessage: "فایل‌ها را برای ارسال اینجا رها کنید",
      dictFallbackMessage: "مرورگر شما از ارسال فایل با کشیدن و رها کردن پشتیبانی نمی‌کند.",
      dictFallbackText: "لطفا از فرم زیر برای ارسال فایل های خود مانند دوران های گذشته استفاده کنید.",
      dictFileTooBig: "فایل خیلی بزرگ است ({{filesize}}MiB). حداکثر اندازه فایل: {{maxFilesize}}MiB.",
      dictInvalidFileType: "شما نمی‌توانید فایل‌هایی از این نوع را ارسال کنید.",
      dictResponseError: "سرور با کد {{statusCode}} پاسخ داد.",
      dictCancelUpload: "لغو ارسال",
      dictCancelUploadConfirmation: "آیا از لغو کردن این ارسال اطمینان دارید؟",
      dictRemoveFile: "حذف فایل",
      dictMaxFilesExceeded: "شما نمی‌توانید فایل دیگری ارسال کنید."
  };

  const previewTemplate = `<div class="dz-preview dz-file-preview">
      <div class="dz-details">
          <div class="dz-thumbnail">
              <img data-dz-thumbnail>
              <span class="dz-nopreview">No preview</span>
              <div class="dz-success-mark"></div>
              <div class="dz-error-mark"></div>
              <div class="dz-error-message"><span data-dz-errormessage></span></div>
              <div class="progress">
                  <div class="progress-bar progress-bar-primary" role="progressbar" aria-valuemin="0" aria-valuemax="100" data-dz-uploadprogress></div>
              </div>
          </div>
          <div class="dz-filename" data-dz-name></div>
          <div class="dz-size" data-dz-size></div>
      </div>
  </div>`;

  // Basic Dropzone
  // --------------------------------------------------------------------
  var basicOptions = {
      previewTemplate: previewTemplate,
      parallelUploads: 1,
      maxFilesize: 5,
      addRemoveLinks: true,
      maxFiles: 1
  };
  Object.assign(basicOptions, messages);

  if (document.querySelector('.dropzone-basic')) {
      const myDropzone = new Dropzone('.dropzone-basic', basicOptions);
  }

  // Multiple Dropzone
  // --------------------------------------------------------------------
  var multiOptions = {
      previewTemplate: previewTemplate,
      parallelUploads: 1,
      maxFilesize: 5,
      addRemoveLinks: true
  };
  Object.assign(multiOptions, messages);

  if (document.querySelector('.dropzone-multi')) {
      const dropzoneMulti = new Dropzone('.dropzone-multi', multiOptions);
  }
});
