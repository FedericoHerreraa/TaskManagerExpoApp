import React from 'react';
import { Link, Tabs } from 'expo-router';
import { Pressable } from 'react-native';
import Colors from '@/constants/Colors';
import { useColorScheme } from '@/components/useColorScheme';
import { useClientOnlyValue } from '@/components/useClientOnlyValue';
import { FontAwesome5 } from '@expo/vector-icons';
import { Feather } from '@expo/vector-icons';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '@/context/AuthContext';


function TabBarIcon(props: {
  name: React.ComponentProps<typeof FontAwesome5>['name'];
  color: string;
}) {
  return <FontAwesome5 size={24} style={{ marginBottom: -3 }} {...props} />;
}

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const { user } = useAuth()

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: useClientOnlyValue(false, true),
      }}>
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }: { color: string }) => <TabBarIcon name="tasks" color={color} />,
          headerRight: () => (
            <Link href={user ? "/profile" : "/modal"} asChild>
              <Pressable>
                {() => (
                  user ? (
                    <FontAwesome5 name="user-circle" size={24} style={{ marginRight: 15 }} color={Colors[colorScheme ?? 'light'].text} />
                   ) : (
                    <Feather 
                      name="user-plus" 
                      size={24} 
                      color={Colors[colorScheme ?? 'light'].text} 
                      style={{ marginRight: 15 }}
                    />
                   )
                )}
              </Pressable>
            </Link>
          ),
        }}
      />
      <Tabs.Screen
        name="newTask"
        options={{
          title: 'Task',
          tabBarIcon: ({ color }: { color: string }) => <Ionicons name="create-outline" size={24} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }: { color: string }) => <Feather name="user" size={24} color={color} />,
        }}
      />
    </Tabs>
  );
}
