# findViewById返回null的常见原因


# findViewById返回null的常见原因

1.在另一个view的元素应该用baseView.findViewById()来拿
findViewById()是要指定view的，也就是说你要找的view 必须是包含在baseView里面的布局（控件） 如果在该父控件下找不到，就会报null。

2.findViewById在setContentView(R.layout.main);之前.即在setContentView调用之前，view要从父类布局里面找，父类布局还没有加载之前找，必然会返回空。

3.写的该布局（控件） ，还没有保存，导致工具不能加载到。自然也是null；

4.工具出现异常，这就是很偶然的情况，一般clean、重启
