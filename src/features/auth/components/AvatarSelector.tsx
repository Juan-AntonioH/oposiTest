import React, { useEffect, useState } from 'react';
import { resolveAvatar } from '../utils/avatarResolver';
import { View, Text, Image, FlatList, Pressable, StyleSheet } from 'react-native';
import { PRESET_AVATARS } from '../constants/avatars';

interface Props {
  selectedAvatarId: string | null;
  customAvatarUri: string | null; // Guardará la ruta física permanente (file://...)
  onSelectAvatar: (avatarId: string) => void;
  onPickImage: () => void;
}

export function AvatarSelector({
  selectedAvatarId,
  customAvatarUri,
  onSelectAvatar,
  onPickImage,
}: Props) {
  const [imageSource, setImageSource] = useState<any>(PRESET_AVATARS[0].image);

  useEffect(() => {
    let mounted = true;

    async function loadAvatar() {
      // Mientras el usuario está editando una imagen recién elegida,
      // mostramos esa URI directamente.
      if (customAvatarUri) {
        if (mounted) {
          setImageSource({ uri: customAvatarUri });
        }
        return;
      }

      const source = await resolveAvatar(selectedAvatarId);

      if (mounted) {
        setImageSource(source);
      }
    }

    loadAvatar();

    return () => {
      mounted = false;
    };
  }, [selectedAvatarId, customAvatarUri]);

  return (
    <View style={styles.container}>
      <Text style={styles.label}>Foto de perfil</Text>

      <View style={styles.headerRow}>
        <Image source={imageSource} style={styles.mainAvatar} />

        <Pressable style={styles.uploadButton} onPress={onPickImage}>
          <Text style={styles.uploadIcon}>↑</Text>
          <Text style={styles.uploadText}>Subir imagen</Text>
        </Pressable>
      </View>

      <FlatList
        horizontal
        data={PRESET_AVATARS}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.listContainer}
        renderItem={({ item }) => {
          const isSelected = selectedAvatarId === item.id && !customAvatarUri;
          return (
            <Pressable
              onPress={() => onSelectAvatar(item.id)}
              style={[styles.thumbnailWrapper, isSelected && styles.selectedThumbnail]}
            >
              <Image source={item.image} style={styles.thumbnail} />
            </Pressable>
          );
        }}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { marginBottom: 20, width: '100%' },
  label: { fontSize: 14, fontWeight: '500', color: '#4A4A4A', marginBottom: 12 },
  headerRow: { flexDirection: 'row', alignItems: 'center', marginBottom: 16 },
  mainAvatar: { width: 80, height: 80, borderRadius: 40, backgroundColor: '#E0E0E0' },
  uploadButton: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#CCCCCC',
    borderRadius: 8,
    paddingVertical: 10,
    paddingHorizontal: 16,
    marginLeft: 20,
    backgroundColor: '#FFFFFF',
  },
  uploadIcon: { fontSize: 16, fontWeight: 'bold', marginRight: 6, color: '#1A1A1A' },
  uploadText: { fontSize: 14, fontWeight: '600', color: '#1A1A1A' },
  listContainer: { paddingVertical: 4 },
  thumbnailWrapper: { borderRadius: 25, marginRight: 10, padding: 2, borderWidth: 2, borderColor: 'transparent' },
  selectedThumbnail: { borderColor: '#007AFF' },
  thumbnail: { width: 46, height: 46, borderRadius: 23 },
});
