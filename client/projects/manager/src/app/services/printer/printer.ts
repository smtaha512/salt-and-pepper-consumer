import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { RasterObj, StarPRNT } from '@ionic-native/star-prnt/ngx';
import { ConsumerInterface, OrderInterface } from 'dist/library';

@Injectable({ providedIn: 'root' })
export class Printer {
  private static readonly FONT_SIZE = 26;
  constructor(private readonly printer: StarPRNT, private readonly datePipe: DatePipe) {}

  print(order: OrderInterface) {
    return this.printer
      .portDiscovery('All')
      .then(([printer]) => printer)
      .then((printer) =>
        this.printRasterReceipt(printer.portName, 'StarDotImpact', {
          text: this.generateText(order),
          fontSize: Printer.FONT_SIZE,
        })
      );
  }

  private generateText(order: OrderInterface) {
    const user = order.userId as ConsumerInterface;
    const username = `${user.firstname} ${user.lastname}`;
    const items = order.items.map((item) => `${item.quantity} ${item.title} | ${item.notes}`);

    return `${this.alignCenter('SALT AND PEPPER')}${this.alignCenter('ONLINE ORDER')}${this.generateLine(
      `${this.datePipe.transform(order.createdAt, 'short')}`
    )}${this.generateLine(`Printed: ${this.datePipe.transform(new Date(), 'short')}`)}${this.generateLine(username)}${items.map((item) =>
      this.generateLine(item)
    )}${this.generateLine('================')}${this.generateLine(`Total:  $${order.total.toString()}`)}${this.generateLine(
      `Online Order ID: ${order._id.slice(-6)}`
    )}
    `;
  }

  private generateLine(text: string) {
    let line = '';
    if (text.length > 19) {
      line = text.substr(0, 19);
      line = line + '\n';
      line = line + this.generateLine(text.substr(19, text.length));
      return '\n' + line + '\n';
    }
    return '\n' + text + '\n';
  }

  private alignCenter(text: string) {
    if (text.length > 19) {
      return this.generateLine(text);
    }
    const spacesOnBothSide = 19 - text.length;
    return '\n' + text.padStart(spacesOnBothSide / 2, ' ') + '\n';
  }

  private printRasterReceipt(port: string, emulation: string, rasterObj: RasterObj) {
    return this.printer.printRasterReceipt(port, emulation, rasterObj);
  }
}
