/**
 * 初始化文件上传
 * 1. 在初始化上传的时候，我们要在tempFileLocation目录（也就是分片存储目录）下根据 md5 新建一个目录，用于保存上传的分片。
 * 2. 这个目录名就是 uploadId，是根据${fileName}-${Date.now()}计算的 md5 值。
 */