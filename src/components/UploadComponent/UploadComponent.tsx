import { ChangeEventHandler, forwardRef } from 'react'
interface UploadnProps {
    id?: string;
    buttonLabel: string;
    onChange?: ChangeEventHandler;
    buttonStyle?: string;
}

export const Upload = forwardRef<HTMLInputElement, UploadnProps>(({ id, buttonLabel, onChange, buttonStyle }, ref) => {
    return <><label className={buttonStyle}>
        <input type='file' id={id} accept="image/png, image/jpeg" onChange={onChange} className={buttonStyle} ref={ref} />
        {buttonLabel}
    </label></>
})