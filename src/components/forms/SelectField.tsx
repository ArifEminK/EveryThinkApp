import React, { useState } from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Modal,
  FlatList,
  Pressable,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { moderateScale, verticalScale, scale } from 'react-native-size-matters';
import { theme } from '../../theme';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

interface SelectOption {
  label: string;
  value: string;
}

interface SelectFieldProps {
  label: string;
  value: string;
  options: SelectOption[];
  onSelect: (value: string) => void;
  icon?: string;
  error?: string;
  containerStyle?: object;
}

export function SelectField({
  label,
  value,
  options,
  onSelect,
  icon,
  error,
  containerStyle,
}: SelectFieldProps) {
  const insets = useSafeAreaInsets();
  const [modalVisible, setModalVisible] = useState(false);
  const selectedOption = options.find((opt) => opt.value === value);

  const handleSelect = (selectedValue: string) => {
    onSelect(selectedValue);
    setModalVisible(false);
  };

  return (
    <View style={[styles.container, containerStyle]}>
      <TouchableOpacity
        style={[styles.selectContainer, error && styles.selectError]}
        onPress={() => setModalVisible(true)}
        activeOpacity={0.7}
      >
        <View style={styles.selectContent}>
          {icon && (
            <Ionicons
              name={icon as any}
              size={moderateScale(20)}
              color={theme.colors.text.secondary}
              style={styles.icon}
            />
          )}
          <View style={styles.selectTextContainer}>
            <Text style={styles.label}>{label}</Text>
            <Text style={styles.value}>
              {selectedOption?.label || 'Seçiniz'}
            </Text>
          </View>
        </View>
        <Ionicons
          name="chevron-forward"
          size={moderateScale(20)}
          color={theme.colors.text.tertiary}
        />
      </TouchableOpacity>
      {error && <Text style={styles.errorText}>{error}</Text>}

      <Modal
        visible={modalVisible}
        transparent
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}
      >
        <Pressable
          style={styles.modalOverlay}
          onPress={() => setModalVisible(false)}
        >
          <View
            style={[
              styles.modalContent,
              { paddingBottom: Math.max(insets.bottom, verticalScale(16)) },
            ]}
          >
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>{label}</Text>
              <TouchableOpacity
                onPress={() => setModalVisible(false)}
                style={styles.closeButton}
              >
                <Ionicons
                  name="close"
                  size={moderateScale(24)}
                  color={theme.colors.text.primary}
                />
              </TouchableOpacity>
            </View>

            <FlatList
              data={options}
              keyExtractor={(item) => item.value}
              renderItem={({ item }) => {
                const isSelected = item.value === value;
                return (
                  <TouchableOpacity
                    style={[
                      styles.optionItem,
                      isSelected && styles.optionItemSelected,
                    ]}
                    onPress={() => handleSelect(item.value)}
                    activeOpacity={0.7}
                  >
                    <Text
                      style={[
                        styles.optionText,
                        isSelected && styles.optionTextSelected,
                      ]}
                    >
                      {item.label}
                    </Text>
                    {isSelected && (
                      <Ionicons
                        name="checkmark"
                        size={moderateScale(20)}
                        color={theme.colors.accent.main}
                      />
                    )}
                  </TouchableOpacity>
                );
              }}
              style={styles.optionsList}
              showsVerticalScrollIndicator={false}
            />
          </View>
        </Pressable>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: verticalScale(12),
  },
  selectContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme.colors.surface.main,
    borderRadius: moderateScale(12),
    paddingHorizontal: scale(16),
    paddingVertical: verticalScale(16),
    borderWidth: 1,
    borderColor: theme.colors.border.light,
  },
  selectError: {
    borderColor: theme.colors.semantic.error,
  },
  selectContent: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  icon: {
    marginRight: scale(12),
  },
  selectTextContainer: {
    flex: 1,
  },
  label: {
    fontSize: moderateScale(12),
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.text.secondary,
    marginBottom: verticalScale(2),
  },
  value: {
    fontSize: moderateScale(16),
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.text.primary,
  },
  errorText: {
    fontSize: moderateScale(12),
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.semantic.error,
    marginTop: verticalScale(4),
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'flex-end',
  },
  modalContent: {
    backgroundColor: theme.colors.surface.main,
    borderTopLeftRadius: moderateScale(20),
    borderTopRightRadius: moderateScale(20),
    maxHeight: '80%',
    paddingTop: verticalScale(20),
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(20),
    paddingBottom: verticalScale(16),
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  modalTitle: {
    fontSize: moderateScale(18),
    fontFamily: theme.typography.fontFamily.bold,
    color: theme.colors.text.primary,
  },
  closeButton: {
    padding: scale(4),
  },
  optionsList: {
    maxHeight: verticalScale(400),
  },
  optionItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: scale(20),
    paddingVertical: verticalScale(16),
    borderBottomWidth: 1,
    borderBottomColor: theme.colors.border.light,
  },
  optionItemSelected: {
    backgroundColor: theme.colors.background.tertiary,
  },
  optionText: {
    fontSize: moderateScale(16),
    fontFamily: theme.typography.fontFamily.regular,
    color: theme.colors.text.primary,
  },
  optionTextSelected: {
    fontFamily: theme.typography.fontFamily.medium,
    color: theme.colors.accent.main,
  },
});

