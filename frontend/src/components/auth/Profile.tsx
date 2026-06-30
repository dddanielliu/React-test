export type ProfileProps = {
    name: string
}

export const Profile = ({name}: ProfileProps) => {
    return <div>Provate Profile component. Name is {name}</div>
}