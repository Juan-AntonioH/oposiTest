import React from 'react';

import {
  Image,
  Pressable,
  ScrollView,
  Text,
  View,
} from 'react-native';

import {
  SafeAreaView,
} from 'react-native-safe-area-context';

import {
  useNavigation,
} from '@react-navigation/native';

import {
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';

import {
  Ionicons,
} from '@expo/vector-icons';

import {
  ScreenLayout,
} from '@/shared/layouts/ScreenLayout';

import {
  RootStackParamList,
} from '@/navigation/types';

import {
  useAuthStore,
} from '@/store/authStore';

import {
  useDashboardStats,
} from '../hooks/useDashboardStats';

import {
  styles,
} from '../styles/dashboard.styles';

type DashboardNavigationProp =
  NativeStackNavigationProp<
    RootStackParamList,
    'Dashboard'
  >;

export function DashboardScreen() {

  const navigation =
    useNavigation<
      DashboardNavigationProp
    >();

  const displayName =
    useAuthStore(
      state =>
        state.displayName,
    );

  const userId =
    useAuthStore(
      state =>
        state.uid,
    );

  const {

    totalTests,

    averageNote,

    successRate,

    loading,

  } = useDashboardStats({

    userId:
      userId ?? '',

  });

  return (

    <ScreenLayout
      title="OposiTest"
    >

      <SafeAreaView
        style={
          styles.safeArea
        }
      >

        <ScrollView

          contentContainerStyle={
            styles.container
          }

          showsVerticalScrollIndicator={
            false
          }

        >

          {/* =====================
                        BIENVENIDA
                    ===================== */}

          <View
            style={
              styles.welcomeContainer
            }
          >

            <View
              style={
                styles.welcomeContent
              }
            >

              <Text
                style={
                  styles.welcomeTitle
                }
              >

                ¡Hola
                {
                  displayName

                    ? `, ${displayName}`

                    : ''
                }
                ! 👋

              </Text>

              <Text
                style={
                  styles.welcomeSubtitle
                }
              >

                Continúa preparando
                tu oposición.

              </Text>

            </View>

            <Image

              source={
                require(
                  '@assets/images/app_logo.webp'
                )
              }

              style={
                styles.dashboardLogo
              }

              resizeMode={
                'contain'
              }

            />

          </View>

          {/* =====================
                ACCIÓN PRINCIPAL
            ===================== */}

          <DashboardAction

            variant="primary"

            icon="school-outline"

            title="Preparar oposición"

            description="
                            Elige una oposición
                            y comienza a practicar.
                        "

            onPress={() => {

              navigation.navigate(
                'Oppositions',
              );

            }}

          />

          {/* =====================
                ACCESOS RÁPIDOS
            ===================== */}

          <Text
            style={
              styles.sectionTitle
            }
          >

            Accesos rápidos

          </Text>

          <View
            style={
              styles.quickActionsGrid
            }
          >

            <DashboardAction

              icon="time-outline"

              title="Historial"

              onPress={() => {

                navigation.navigate(
                  'ExamHistoryScreen',
                );

              }}

            />

            <DashboardAction

              icon="person-outline"

              title="Perfil"

              onPress={() => {

                navigation.navigate(
                  'Profile',
                );

              }}

            />

          </View>

          {/* =====================
                        ACTIVIDAD
            ===================== */}

          <Text
            style={
              styles.sectionTitle
            }
          >

            Tu actividad

          </Text>

          <View
            style={
              styles.activityGrid
            }
          >

            <DashboardStat

              value={
                loading

                  ? '—'

                  : String(
                    totalTests,
                  )
              }

              label="Tests"

              icon="document-text-outline"

            />

            <DashboardStat

              value={
                loading

                  ? '—'

                  : averageNote
              }

              label="Media"

              icon="ribbon-outline"

            />

            <DashboardStat

              value={
                loading

                  ? '—'

                  : `${successRate} %`
              }

              label="Acierto"

              icon="checkmark-circle-outline"

            />

          </View>

        </ScrollView>

      </SafeAreaView>

    </ScreenLayout>

  );

}

/* =====================
   DASHBOARD ACTION
===================== */

interface DashboardActionProps {

  icon:
  React.ComponentProps<
    typeof Ionicons
  >['name'];

  title:
  string;

  description?:
  string;

  variant?:
  | 'primary'
  | 'quick';

  onPress:
  () => void;

}

function DashboardAction({

  icon,

  title,

  description,

  variant =
  'quick',

  onPress,

}: DashboardActionProps) {

  const isPrimary =

    variant ===
    'primary';

  return (

    <Pressable

      style={[

        isPrimary

          ? styles.mainCard

          : styles.quickAction,

      ]}

      onPress={
        onPress
      }

    >

      <View
        style={[

          isPrimary

            ? styles.mainCardIcon

            : styles.quickActionIcon,

        ]}
      >

        <Ionicons

          name={
            icon
          }

          size={
            isPrimary

              ? 30

              : 25
          }

          color="#2563EB"

        />

      </View>

      {
        isPrimary

          ? (

            <View
              style={
                styles.mainCardContent
              }
            >

              <Text
                style={
                  styles.mainCardTitle
                }
              >

                {
                  title
                }

              </Text>

              {
                description

                &&

                <Text
                  style={
                    styles.mainCardDescription
                  }
                >

                  {
                    description
                  }

                </Text>
              }

            </View>

          )

          : (

            <Text
              style={
                styles.quickActionTitle
              }
            >

              {
                title
              }

            </Text>

          )
      }

      {
        isPrimary

        &&

        <Ionicons

          name="chevron-forward"

          size={
            24
          }

          color="#64748B"

        />
      }

    </Pressable>

  );

}

/* =====================
   ESTADÍSTICA
===================== */

interface DashboardStatProps {

  value:
  string;

  label:
  string;

  icon:
  React.ComponentProps<
    typeof Ionicons
  >['name'];

}

function DashboardStat({

  value,

  label,

  icon,

}: DashboardStatProps) {

  return (

    <View
      style={
        styles.activityCard
      }
    >

      <View
        style={
          styles.activityIcon
        }
      >

        <Ionicons

          name={
            icon
          }

          size={
            20
          }

          color="#2563EB"

        />

      </View>

      <Text
        style={
          styles.activityValue
        }
        numberOfLines={
          1
        }
        adjustsFontSizeToFit={
          true
        }
      >

        {
          value
        }

      </Text>

      <Text
        style={
          styles.activityLabel
        }
        numberOfLines={
          1
        }
      >

        {
          label
        }

      </Text>

    </View>

  );

}