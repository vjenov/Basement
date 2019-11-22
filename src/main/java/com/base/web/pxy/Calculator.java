package com.base.web.pxy;

import org.springframework.stereotype.Component;

@Component
public class Calculator {
	public int sum(int a, int b) {
		return a + b;
	}
	public int sub(int a, int b) {
		return a - b;
	}
	public int abs(int a) {
		return Math.abs(a);
	}

}