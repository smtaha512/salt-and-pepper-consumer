import { DatePipe } from '@angular/common';
import { Injectable } from '@angular/core';
import { RasterObj, StarPRNT } from '@ionic-native/star-prnt/ngx';
import { ConsumerInterface, OrderInterface } from 'dist/library';

@Injectable({ providedIn: 'root' })
export class Printer {
  private static readonly FONT_SIZE = 20;
  private static MAX_CHARS_PER_LINE: number = 25;
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
    Printer.MAX_CHARS_PER_LINE = parseInt(prompt('Enter max characters allowed per line'));
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
    const customerName = 'Name: '.concat(user.firstname).concat(' ').concat(user.lastname);
    const items = order.items.map((item) =>
      this.generateLine(`${item.quantity} ${item.title}`).concat(this.generateLine('Notes: '.concat(item.notes)))
    );
    const printedAt = 'Printed: '.concat(this.datePipe.transform(new Date(), 'short'));
    const total = `Total:  $${order.total.toString()}`;
    const onlineOrderId = order._id.slice(-6);

    const text = this.alignCenter('SALT AND PEPPER')
      .concat(this.alignCenter('ONLINE ORDER'))
      .concat(this.generateLine(this.datePipe.transform(order.createdAt, 'short')))
      .concat(this.generateLine(printedAt))
      .concat(this.generateLine(customerName))
      .concat(this.alignCenter('ORDER:'))
      .concat(this.generateLine('================'))
      .concat(items.map((item) => this.generateLine(item)).join())
      .concat(this.generateLine('================'))
      .concat(this.generateLine(total))
      .concat(this.generateLine('Online Order ID: '))
      .concat(this.generateLine(onlineOrderId));

    return text;
  }

  private generateLine(text: string) {
    let line = '';
    // if (text.length > Printer.MAX_CHARS_PER_LINE) {
    //   line = text.substr(0, Printer.MAX_CHARS_PER_LINE);
    //   line = line + '\n';
    //   line = line + this.generateLine(text.substr(Printer.MAX_CHARS_PER_LINE, text.length));
    //   return '\n' + line + '\n';
    // }
    return '\n' + text + '\n';
  }

  private alignCenter(text: string) {
    if (text.length > Printer.MAX_CHARS_PER_LINE) {
      return this.generateLine(text);
    }
    const spacesOnBothSide = Printer.MAX_CHARS_PER_LINE - text.length;
    return '\n' + text.padStart(spacesOnBothSide / 2, ' ') + '\n';
  }

  private printRasterReceipt(port: string, emulation: string, rasterObj: RasterObj) {
    return this.printer.printRasterReceipt(port, emulation, rasterObj);
  }
}
