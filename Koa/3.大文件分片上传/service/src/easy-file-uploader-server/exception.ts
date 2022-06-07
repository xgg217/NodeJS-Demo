enum FILE_UPLOADER_STATUS_CODE {
  SUCCESS = 0,
  FOLDER_EXIST = 1001,
  NOT_FOUND = 1002,
  MD5_CHECK_FAILED = 1003,
  UNKNOWN_ERROR = 5000,
}

class Exception extends Error {
  code: FILE_UPLOADER_STATUS_CODE;
  constructor(code: FILE_UPLOADER_STATUS_CODE, message: string) {
    super(message);
    this.code = code;
    this.message = message;
  }
}

class FolderExistException extends Exception {
  constructor(message: string) {
    super(FILE_UPLOADER_STATUS_CODE.FOLDER_EXIST, message);
  }
}

export {
  FILE_UPLOADER_STATUS_CODE,
  Exception,
  FolderExistException
}
