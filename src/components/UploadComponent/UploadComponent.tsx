import { ChangeEventHandler, forwardRef } from 'react'
interface UploadnProps {
    id?: string;
    buttonLabel: string;
    onChange?: ChangeEventHandler;
    buttonStyle?: string;
    logo: string;
}

export const Upload = forwardRef<HTMLInputElement, UploadnProps>(({ id, buttonLabel, onChange, buttonStyle, logo }, ref) => {
    return <><label className={buttonStyle}>
        <input type='file' id={id} accept="image/png, image/jpeg" onChange={onChange} className={buttonStyle} ref={ref} />
        <div className='flex'>
            <img alt='logo' src={logo} /><span className='mt-5'>{buttonLabel}</span>
        </div>
    </label></>
})