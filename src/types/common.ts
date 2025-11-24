/**
 * Common Type Definitions
 * Shared types used across the application
 */

import { FirebaseFirestoreTypes } from '@react-native-firebase/firestore';

/**
 * FireDate - Union type for date fields that can be either string or Firestore Timestamp
 * Use this when working with Firestore date fields that might be in different formats
 */
export type FireDate = string | FirebaseFirestoreTypes.Timestamp;
