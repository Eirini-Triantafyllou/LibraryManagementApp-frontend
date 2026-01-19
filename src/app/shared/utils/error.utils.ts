import { HttpErrorResponse } from "@angular/common/http";
import { AppError } from "../interfaces/errors";


export class ErrorUtils {

    // Mετατροπή HttpErrorResponse σε AppError
  static createAppError(error: HttpErrorResponse): AppError {
    return {
      status: error.status || 0,
      code: error.error?.code,
      message: error.error?.message || error.message,
      userMessage: this.getUserFriendlyMessage(error),
      originalError: error
    };
  }

  static getUserFriendlyMessage(error: HttpErrorResponse): string {
    if (error.error?.userMessage) {
      return error.error.userMessage;
    }

    switch (error.status) {
      case 0: return 'Δεν είναι δυνατή η σύνδεση με τον διακομιστή.';
      case 400: return this.get400Message(error);
      case 401: return 'Η συνεδρία σας έχει λήξει. Παρακαλώ συνδεθείτε ξανά.';
      case 403: return 'Δεν έχετε δικαιώματα για αυτήν την ενέργεια.';
      case 404: return this.get404Message(error);
      case 409: return 'Υπάρχει σύγκρουση με υπάρχουσες πληροφορίες.';
      case 500: return 'Σφάλμα διακομιστή. Παρακαλώ δοκιμάστε ξανά αργότερα.';
      default: return 'Προέκυψε ένα μη αναμενόμενο σφάλμα.';
    }
  }

  private static get400Message(error: HttpErrorResponse): string {
    switch (error.error?.code) {
      case 'book_already_in_wishlist': return 'Αυτό το βιβλίο υπάρχει ήδη στη λίστα επιθυμιών σας.';
      case 'entity_already_exists': return 'Υπάρχει ήδη εγγραφή με αυτά τα στοιχεία.';
      case 'validation_error': return 'Παρακαλώ ελέγξτε τα στοιχεία που εισάγατε.';
      default: return 'Μη έγκυρη αίτηση. Ελέγξτε τα στοιχεία που εισάγατε.';
    }
  }

  private static get404Message(error: HttpErrorResponse): string {
    switch (error.error?.code) {
      case 'book_not_found': return 'Το βιβλίο δεν βρέθηκε.';
      case 'wishlist_item_not_found': return 'Αυτό το βιβλίο δεν υπάρχει στη λίστα επιθυμιών σας.';
      default: return 'Ο πόρος που ζητήσατε δεν βρέθηκε.';
    }
  }
}

