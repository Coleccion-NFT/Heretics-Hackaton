import * as SolidIcons from "@heroicons/react/24/solid"
import * as OutlineIcons from "@heroicons/react/24/outline"

export const HeroIcon = ({ icon, color, size, outline = false }) => {
    const { ...icons } = outline ? OutlineIcons : SolidIcons

    const Icon = icons[icon]

    const className = [
        `${color ? color : "text-black"}`,
        `h-${size ? size : 6}`,
        `w-${size ? size : 6}`,
    ]

    return <Icon className={className.join(" ")} />
}

export default HeroIcon
