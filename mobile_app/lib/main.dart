import 'package:flutter/material.dart';

void main() {
  WidgetsFlutterBinding.ensureInitialized();
  runApp(const GyaamApp());
}

class GyaamApp extends StatelessWidget {
  const GyaamApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MaterialApp(
      title: 'GYAAN.AI',
      debugShowCheckedModeBanner: false,
      theme: ThemeData(
        useMaterial3: true,
        colorScheme: ColorScheme.fromSeed(
          seedColor: const Color(0xFF56358B), // Primary Purple
          primary: const Color(0xFF56358B),
          secondary: const Color(0xFF14A89A), // Learning Teal
          tertiary: const Color(0xFFF0B44D), // Focus Amber
          surface: const Color(0xFFF7F5FA),
        ),
        scaffoldBackgroundColor: const Color(0xFFF7F5FA),
        fontFamily: 'Roboto',
      ),
      home: const Scaffold(
        body: Center(
          child: Text(
            'GYAAN.AI Mobile Client',
            style: TextStyle(
              fontSize: 22,
              fontWeight: FontWeight.bold,
              color: Color(0xFF56358B),
            ),
          ),
        ),
      ),
    );
  }
}
