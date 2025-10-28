// import { useLocation, Link } from 'react-router-dom';
// import { ItemWrapper, IconWrapper, LabelText, UnreadCount } from './Sidebar.styles';
// import { ReactNode } from 'react';

// type SidebarItemProps = {
//   label: string;
//   icon: ReactNode;
//   path: string;
//   unreadCount?: number;
// };

// const SidebarItem = ({ label, icon, path, unreadCount = 0 }: SidebarItemProps) => {
//   const location = useLocation();
//   const isActive = location.pathname === path;

//   return (
//    <Link to={path} title={label}>
//       <ItemWrapper $active={isActive}>
//         <IconWrapper>{icon}</IconWrapper>
//         <LabelText>{label}</LabelText>
//         {unreadCount > 0 && <UnreadCount>{unreadCount}</UnreadCount>}
//       </ItemWrapper>
//     </Link>
//   );
// };

// export default SidebarItem;
