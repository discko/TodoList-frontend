import { IMessageHandle, IMessageOptions } from 'element-plus/lib/message/src/types'
import { Message } from 'element-plus/lib/message'

interface ElMessage {
  (text: string): IMessageHandle;
  (options: IMessageOptions): IMessageHandle;
  success(text: string | IMessageOptions): IMessageHandle;
  warning(text: string | IMessageOptions): IMessageHandle;
  info(text: string | IMessageOptions): IMessageHandle;
  error(text: string | IMessageOptions): IMessageHandle;
}

const message = function (arg: string | IMessageOptions): IMessageHandle {
  if (typeof arg === 'string') {
    arg = {
      message: arg
    }
  }
  arg.type = 'info'
  return Message(arg)
} as ElMessage;

['success', 'warning', 'info', 'error', ''].forEach(element => {
  const type = element as 'success' | 'warning' | 'info' | 'error'
  message[type] = (arg: string | IMessageOptions): IMessageHandle => {
    if (typeof arg === 'string') {
      arg = {
        message: arg
      }
    }
    arg.type = type
    return Message(arg)
  }
})

export {
  message as epMessage
}
