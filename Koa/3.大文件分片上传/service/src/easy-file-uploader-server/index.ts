import { mkdir, existsSync } from 'fs';
import { promisify } from 'util';
import { join } from 'path';
import { calculateMd5 } from './util';
import {
  FILE_UPLOADER_STATUS_CODE,
  Exception,
  FolderExistException
} from './exception'

interface IFileUploaderOptions {
  tempFileLocation: string; // 分片存储路径
  mergedFileLocation: string; // 合并后的文件路径
}

const mkdirPromisify = promisify(mkdir);

class FileUploaderServer {
  private fileUploaderOptions: IFileUploaderOptions;

  /**
   * 初始化文件分片上传，实际上就是根据fileName和时间计算一个md5，并新建一个文件夹
   * @param fileName 文件名
   * @returns 上传Id
   */
  public async initFilePartUpload(fileName: string):Promise<string | undefined>{
    try {
      const { tempFileLocation } = this.fileUploaderOptions;
      // 创建文件夹 如果目录结构不存在，则创建它，如果目录存在，则不进行创建，类似mkdir -p。
      // await fse.ensureDir(tempFileLocation);
      await mkdirPromisify(tempFileLocation, { recursive: true });
      const uploadId = calculateMd5(`${fileName}-${Date.now()}`); // 获取上传的ID
      const uploadFolderPath = join(tempFileLocation, uploadId);
      // 目录是否存在
      const isUploadFolderExist = existsSync(uploadFolderPath);
      if(isUploadFolderExist) {
        // 存在
        throw new FolderExistException('发现相同的上载文件夹，可能您遇到哈希冲突');
      }
      // 创建目录
      await mkdirPromisify(uploadFolderPath);
      return uploadId;
    } catch (error) {
      console.error(error);
    }
  }

  /**
   * 上传分片，实际上是将partFile写入uploadId对应的文件夹中，写入的文件命名格式为`partIndex|md5`
   * @param uploadId 上传Id
   * @param partIndex 分片序号
   * @param partFile 分片内容
   * @returns 分片md5
   */
  public async uploadPartFile(
    uploadId: string,
    partIndex: number,
    partFile: Buffer,
  ): Promise<string> {
    const { tempFileLocation } = this.fileUploaderOptions;
    await mkdirPromisify(tempFileLocation, { recursive: true });
    const uploadFolderPath = join(tempFileLocation, uploadId);
  }

  /**
   * 获取已上传的分片信息，实际上就是读取这个文件夹下面的内容
   * @param uploadId 上传Id
   * @returns 已上传的分片信息
   */
  public async listUploadedPartFile(
    uploadId: string,
  ): Promise<IUploadPartInfo[]> {}

  /**
   * 取消文件上传，硬删除会直接删除文件夹，软删除会给文件夹改个名字
   * @param uploadId 上传Id
   * @param deleteFolder 是否直接删除文件夹
   */
  async cancelFilePartUpload(
    uploadId: string,
    deleteFolder: boolean = false,
  ): Promise<void> {}

  /**
   * 完成分片上传，实际上就是将所有分片都读到一起，然后进行md5检查，最后存到一个新的路径下。
   * @param uploadId 上传Id
   * @param fileName 文件名
   * @param md5 文件md5
   * @returns 文件存储路径
   */
  async finishFilePartUpload(
    uploadId: string,
    fileName: string,
    md5: string,
  ): Promise<IMergedFileInfo> {}
}
