import {useRouter} from "next/navigation";

const XNavigate = ({next}: {next: string}) => {
    useRouter().push(next)
    return <div/>
}

export default XNavigate
