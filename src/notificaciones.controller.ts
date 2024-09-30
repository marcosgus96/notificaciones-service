import { Controller } from '@nestjs/common';
import { EventPattern, Payload } from '@nestjs/microservices';
import { EmailService } from './email.service';

@Controller()
export class NotificacionesController {
  constructor(private readonly emailService: EmailService) {}

  @EventPattern('pedido_actualizado')
  async handlePedidoActualizado(@Payload() data: any) {
    const { emailUsuario, estadoPedido, idPedido } = data;
    const subject = `Actualización de tu pedido #${idPedido}`;
    const text = `Hola, tu pedido #${idPedido} ha sido actualizado al estado: ${estadoPedido}.`;

    await this.emailService.sendMail(emailUsuario, subject, text);
  }
}
