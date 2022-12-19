import * as SolidIcons from "@heroicons/react/solid"
import * as OutlineIcons from "@heroicons/react/outline"

export const HeroIcon = ({ icon, color, size, outline }) => {
    const { ...icons } = outline ? OutlineIcons : SolidIcons

    const Icon = icons[icon]

    const className = [
        `${color ? color : "text-black"}`,
        `h-${size ? size : 6}`,
        `w-${size ? size : 6}`,
    ]

    return <Icon className={classes.join(" ")} />
}
