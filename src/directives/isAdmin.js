import { SchemaDirectiveVisitor } from 'apollo-server-express';
import { defaultFieldResolver } from 'graphql';

class IsAdminDirective extends SchemaDirectiveVisitor {
  visitFieldDefinition (field) {
    const { resolve = defaultFieldResolver } = field;

    field.resolve = async function (...args) {
      /* extract user from context */
      const { user } = args[2];

      if (!user) {
        throw new Error('You are not authenticated!');
      }

      if (user.role !== 'ADMIN') {
        throw new Error('You must be administrator to perform this operation!');
      }

      return resolve.apply(this, args);
    }
  }
}

module.exports = IsAdminDirective