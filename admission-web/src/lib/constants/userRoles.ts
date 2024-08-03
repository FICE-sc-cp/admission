import { Role } from '$/utils/src/enums/RolesEnum';

export const userRoles: Record<Role, string> = {
  [Role.ENTRANT]: 'Вступник',
  [Role.ADMIN]: 'Адмін',
};
