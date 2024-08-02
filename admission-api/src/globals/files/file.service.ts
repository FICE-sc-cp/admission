import { Injectable } from '@nestjs/common';
import Docxtemplater from 'docxtemplater';
import * as fs from 'fs';
import { join, resolve as resolvePath } from 'path';
import PizZip from 'pizzip';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class FileService {
  constructor (
    private readonly configService: ConfigService,
  ) {}

  fillTemplate (fileName: string, data: object) {
    const nodeEnv = this.configService.get<string>('nodeEnv');
    const path = join(nodeEnv === 'local' ? resolvePath() : '/var/task/admission-api', 'private/templates', fileName);
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
