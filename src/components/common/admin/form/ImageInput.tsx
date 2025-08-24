import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"

const ImageInput = () => {
    const name ='image'
  return (
    <div className="mb-3">
        <Label className="capitalize">
                {name}
        </Label>
        <Input 
        id = {name}
        name={name}
        type="file"
        //required
        accept="image/*"
        />
    </div>
  )
}
export default ImageInput