import { TextInput } from "react-native";

export function EmailInput ({ placeholder = "E-mail", value, setValue }) {
    return (
        <TextInput
            placeholder={placeholder}
            placeholderTextColor="black"
            style={styles.input}
            inputMode="email"
            autoCapitalize="none"
            onChangeText={setValue}
            value={value}
        />
    )
}

export function PasswordInput ({ placeholder = "Senha", value, setValue }) {
    return (
        <TextInput
            placeholder={placeholder}
            placeholderTextColor="black"
            style={styles.input}
            autoCapitalize="none"
            secureTextEntry={true}
            onChangeText={setValue}
            value={value}
        />
    )
}