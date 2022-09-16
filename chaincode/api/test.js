const path = require('path');

let rootPath = path.resolve(__dirname ); //代码文件的根路径
console.log(rootPath);
let grandFatherFolderPath = path.resolve (__dirname, '../../../test-network','organizations' ); //得到祖父級文件夾路徑。
console.log(grandFatherFolderPath);