import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { RasterObj, StarPRNT } from '@ionic-native/star-prnt/ngx';
import { ConsumerInterface, OrderInterface } from 'dist/library';

@Injectable({ providedIn: 'root' })
export class Printer {
  private static readonly FONT_SIZE = 20;
  constructor(private readonly printer: StarPRNT, private readonly datePipe: DatePipe) {}

  async sequentialPrints(orders: OrderInterface[]) {
    const results = [];
    for (const order of orders) {
      try {
        results.push(await this.print(order));
      } catch (error) {
        results.push(error);
      }
    }
    return results;
  }

  print(order: OrderInterface) {
    const fontSize = parseInt(prompt('Enter font size'));
    return this.printer
      .portDiscovery('All')
      .then(([printer]) => printer)
      .then((printer) =>
        this.printRasterReceipt(printer.portName, 'StarDotImpact', {
          text: this.generateText(order),
          fontSize: fontSize ?? Printer.FONT_SIZE,
        })
      );
  }

  private generateText(order: OrderInterface) {
    const user = order.userId as ConsumerInterface;
    const customerName = `${user.firstname} ${user.lastname}`;
    const items = order.items.map((item) => `${item.quantity} ${item.title} | ${item.notes}`);
    const printedAt = 'Printed: '.concat(this.datePipe.transform(new Date(), 'short'));
    const total = `Total:  $${order.total.toString()}`;
    const onlineOrderId = 'Online Order ID: '.concat(order._id.slice(-6));

    const text = this.alignCenter('SALT AND PEPPER')
      .concat(this.alignCenter('ONLINE ORDER'))
      .concat(this.generateLine(this.datePipe.transform(order.createdAt, 'short')))
      .concat(this.generateLine(printedAt))
      .concat(this.generateLine(customerName))
      .concat(items.map((item) => this.generateLine(item)).join())
      .concat(this.generateLine('================'))
      .concat(this.generateLine(total))
      .concat(this.generateLine(onlineOrderId));

    return text;
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
