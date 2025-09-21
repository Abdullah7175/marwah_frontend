

type SpaceProps = {
    h?: any;
    w?: any;
}

export default function Space({ w, h }: SpaceProps) {
    return (<div style={{ width: w ?? 0, height: h ?? 0 }}>

    </div>)


}