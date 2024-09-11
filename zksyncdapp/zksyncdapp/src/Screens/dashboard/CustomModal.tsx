import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
  } from '@/src/components/ui/dialog'
  import { cn } from '@/src/lib/utils'
  
  type TProps = {
    isOpen: boolean
    children: React.ReactNode
    onClose: () => void
    title?: string
    description?: string
    header?: React.ReactNode
    footer?: React.ReactNode
    className?: string
    pattern?: boolean | undefined
  }
  
  export const CustomModal = ({
    isOpen,
    onClose,
    title,
    description,
    footer,
    children,
    className,
  }: TProps) => {
    return (
      <Dialog open={isOpen} onOpenChange={onClose} modal={true}>
        <DialogContent className={cn(`sm:max-w-lg`, className)}>
          {/* <Image alt='pattern' src={Pattern} className='absolute -top-0 h-30' /> */}
  
          <DialogHeader>
            {!!title && <DialogTitle>{title}</DialogTitle>}
  
            {/* Description */}
            {!!description && (
              <DialogDescription>
                Anyone who has this link will be able to view this.
              </DialogDescription>
            )}
          </DialogHeader>
  
          {children}
  
          {/* Footer */}
          {!!footer && (
            <DialogFooter className='sm:justify-start'>{footer}</DialogFooter>
          )}
        </DialogContent>
      </Dialog>
    )
  }