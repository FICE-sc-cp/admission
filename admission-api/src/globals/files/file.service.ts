import { Injectable } from '@nestjs/common';
import Docxtemplater from 'docxtemplater';
import * as fs from 'fs';
import { join, resolve as pathResolve } from 'path';
import PizZip from 'pizzip';

@Injectable()
export class FileService {
  fillTemplate (fileName: string, data: object) {
    const path = join(pathResolve(), 'private/templates', fileName);
    const zip = new PizZip(fs.readFileSync(path, 'binary'));
  
    const doc = new Docxtemplater(zip, {
      paragraphLoop: true,
      linebreaks: true,
      nullGetter: () => '',
    });
  
    doc.render(data);
    return doc.getZip().generate({
      type: 'nodebuffer',
      compression: 'DEFLATE',
    });
  }
}