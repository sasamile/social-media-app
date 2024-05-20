import {HomeIcon, BellIcon ,InboxIcon, BookmarkIcon, ClipboardDocumentCheckIcon, UserIcon, HashtagIcon} from "@heroicons/react/24/solid"
import {EllipsisHorizontalCircleIcon} from "@heroicons/react/24/outline"

export const SibedarIcons = [
    {
        name: "Home",
        icon: HomeIcon,
        path : "/"
    },
    {
        name: "Explore",
        icon: HashtagIcon,
        path : "/explore"
    },
    {
        name: "Notifications",
        icon: BellIcon,
        path : "/notifications"
    },
    {
        name: "Messages",
        icon: InboxIcon,
        path : "/messages"
    },      
    {
        name: "Bookmarks",
        icon: BookmarkIcon,
        path : "/bookmarks"
    },
    {
        name: "Lists",
        icon: ClipboardDocumentCheckIcon,
        path : "/lists"
    },
    {
        name: "Profile",
        icon: UserIcon,
        path : "/profile"
    },
    {
        name: "More",
        icon: EllipsisHorizontalCircleIcon,
        path : "/more"
    }
    
]

