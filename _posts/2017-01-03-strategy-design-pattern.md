---
title: The Strategy Design Pattern
description: If you are interested in learning Design Patterns then Strategy Design Pattern is the place to start. It is the simplest and most useful design pattern of all in the series.
image: https://shabab477.github.io/blog/img/posts/2017-01-03-strategy-design-pattern/back.jpg
comments: true
---

![Strategy meme](img/posts/2017-01-03-strategy-design-pattern/back.jpg "Strategy meme")

Welcome to the world of design patterns. That magical place in the kingdom of software development where life is simpler if you follow some rules here and there. I will be posting a series of the most common design patterns. Maybe not every week but there will be posts regarding this topic. Eventually we will be learning the big daddy of design patterns, **Model View Controller Pattern**, which is basically a compound pattern or we can say that its some patterns that I will be posting about combined to make a kick-ass pattern leading to eternal zen. 

### Pre-requisites:

Design patterns are language agnostic, i.e, not dependent on a specific language but since I am posting about patterns that are object oriented so any language that has object oriented features should do. Here I am using Java. Because why not? Anyways these are some things you should understand clearly before you continue. 

1. Basic Java Syntax.
2. Inheritance and Polymorphism.
3. Interfaces and Abstract Classes.

### Can we please start writing code?

No we can't start writing code dummy. Today we are gonna go through the "Strategy Design Pattern" so first we gotta understand what the pattern actually states**(remember its all in the basics)**. The pattern definition states: 

> "the strategy pattern (also known as the policy pattern) is a behavioural software design pattern that enables an algorithm's behavior to be selected at runtime. The strategy pattern. defines a family of algorithms, encapsulates each algorithm, and makes the algorithms interchangeable within that family"

<img src="https://i.imgflip.com/1h0wme.jpg" title="classy meme" alt='just wanted to sound smart'/>

In simple terms, the strategy pattern allows division of labor. If you are familiar with the concept of object oriented programming then you should understand that we want each class to do one thing and one thing only. We do not want a single class to handle bunch of different logic. So strategy pattern allows us to have a class, suppose 'A', keep a reference to another class, suppose 'B', which handles the algorithmic logic required to do a specific job. The best thing about this is that at any time we can just change the reference from class 'A' to some other class, say 'C', which in turn changes the logic involved. Now class 'C' handles all the algorithmic logic.

Okay, it still might be hard to grab. Best if we go through a real world problem.

### Our Problem

We want a software for a company. The company's system has a bunch of users, suppose Employees(Cliché much?). The users of the system need to have a system to get paid. They either get paid by credit card or the money gets posted to their house. You need to add this functionality to your software.

### Our Solution

Surely we have made a class named **User** or **Employee** in our java course. This is a walk in the park! All we have to do is add some extra logic to the class. 

Our **User.java** file should look like this with the embedded logic.


{% highlight java linenos %} public class User {
    private String name;
    private boolean isCard;
    private boolean isHouse;
    
    public User(String name)
    {
        this.name = name;
        this.isCard = false;
        this.isHouse = false;
    }
    
    public void setHousePayment(boolean flag)
    {
        isHouse = flag;
    }
    
    public void setCardPayment(boolean flag)
    {
        isCard = flag;
    }
    
    public void getSalaryPaid()
    {
        if(isCard == true)
        {
            System.out.println("paying by card");
            //logic for card payment
        }
        else if(isHouse == true)
        {
            System.out.println("paying by house");
            //logic for house payment
        }
        else
        {
            System.out.println("No payment method");
        }
    }
    
    @Override
    public String toString()
    {
        return this.name;
    }
    
}

{% endhighlight %}

There! Done! Lets test our code in the **Main.java** file.

{% highlight java linenos %}
public class Main {
    
    public static void main(String[] args) {
        User legolas = new User("Legolas");
        User gimli = new User("Gimli");
        
        legolas.setCardPayment(true);
        gimli.setHousePayment(true);
        
        System.out.println("Paying legolas");
        legolas.getSalaryPaid();
        
        System.out.println("Paying Gimli");
        gimli.getSalaryPaid();
        
        System.out.println("Gimli changing payment method");
        gimli.setHousePayment(false);
        gimli.setCardPayment(true);
        
        System.out.println("Paying gimli");
        gimli.getSalaryPaid();
        
    }
    
}


{% endhighlight %}

Our output:
{% highlight java linenos%}
Paying legolas
paying by card
Paying Gimli
paying by house
Gimli changing payment method
Paying gimli
paying by card
	
{% endhighlight %}

Woohooo! Our code works! We made a class User with a payment method. All we have to do is set the payment method and then if someone wants to change it then he has to call the set method assosciated with it. Now lets flex our muscles and boast on our software development prowess, hell yeah!

### The Problem with the solution

In the world of software engineering there is this little thing called **CHANGE**. The logic has to change at one time or another. You just can't avoid it. In the User class there is logic for Credit card payment and home payment. What if the client wants a payment method by PayPal. Damn! Now you have to manage three boolean variables and another if block gets added to the **getSalaryPaid()** method. What if after 2 months another way to get paid needs to be added. I can just imagine that smirk on your face vanish while writing this! Hahahaahaaa! Also, it has to be noted that everytime some new payment gateway requirement is given it also adds a level of complexity. Lets keep an eye out for that shall we.

### What we as a programmer want

 Based on the previous paragraph which describes how our ass is gonna get spanked due to the clients changing requirement we should now list what we want as a programmer. As a programmer we want our code to:

 1. Have a flexible way to change the logic without changing the User class everytime new requirement comes(No long chain of if conditions).
 2. Have no internal logic in the User class for payment(No complexity of logic in the User class).
 3. Have a way for some other class to handle all the complex logic related to payment.


### The Strategy Design solution

Wait what?! The user class has no logic in it? Then how are we gonna get it done. Wait my young padowan, wait. Strategy is the key. First lets clean up the **User.java** class. Its a mess.

**User.java**


{% highlight java linenos %}
public class User {
    private String name;
   
    public User(String name)
    {
        this.name = name;
        
    }
    
    
    public void getSalaryPaid()
    {
       //something happens here. 
    }
    
    @Override
    public String toString()
    {
        return this.name;
    }
    
}
{% endhighlight %}

I removed all the boolean variables and the shitty if-else statements in the getSalaryPaid() method. 

Our journey starts by first making an interface. Named **PayMaster.java**

PayMaster.java looks like this.

{% highlight java linenos %}
public interface PayMaster {
    public void pay();
}
{% endhighlight %}

Now we need to make a bunch of classes which handles logic for payment by home or by credit card, all of these classes implement the above interface. 
So here is HomePayment.java

{% highlight java linenos %}
public class HomePayment implements PayMaster{

    @Override
    public void pay() {
        System.out.println("Paying by home");
        //logic for home payment
    }
    
}
{% endhighlight %}

CardPayment.java

{% highlight java linenos %}
public class CardPayment implements PayMaster{

    @Override
    public void pay() {
        System.out.println("Paying by card");
        //logic for payment by card.
    }
    
}
{% endhighlight %}

We are almost there. Now we have to keep a reference to any of these classes in the User class and just call the implemented method. 

Here is our cleaner and much more robust User.java class

{% highlight java linenos %}
public class User {
    private String name;
    private PayMaster payMaster;
   
    public User(String name)
    {
        this.name = name;
        this.payMaster = new HomePayment();
    }
    
    public void setPaymentMethod(PayMaster payMaster)
    {
        this.payMaster = payMaster;
    }
    
    public void getSalaryPaid()
    {
       //something happens here. 
       payMaster.pay();
    }
    
    @Override
    public String toString()
    {
        return this.name;
    }
    
}

{% endhighlight %}

Lets test the code with our Main.java class which looks like this:

{% highlight java linenos %}public class Main {
    
    public static void main(String[] args) {
        User legolas = new User("Legolas");
        User gimli = new User("Gimli");
        
        legolas.setPaymentMethod(new CardPayment());
        gimli.setPaymentMethod(new HomePayment());
        
        System.out.println("Paying legolas");
        legolas.getSalaryPaid();
        
        System.out.println("Paying Gimli");
        gimli.getSalaryPaid();
        
        System.out.println("Gimli changing payment method");
        gimli.setPaymentMethod(new CardPayment());
        
        System.out.println("Paying gimli");
        gimli.getSalaryPaid();
        
    }
    
}

{% endhighlight %}


The output:

{% highlight java linenos %}
Paying legolas
Paying by card
Paying Gimli
Paying by house
Gimli changing payment method
Paying gimli
Paying by card

{% endhighlight%}

<img src="https://i.imgflip.com/1h13vk.jpg" title="grumpy cat" alt="grumpy cat meme" />

Yes, the output is exactly the same as we got in the previous implementation. But look at what we have done. Now if a new requirement comes in we don't have to add a single line of code in the User class. We just make another class for the payment method with its own set of logic by implementing the interface and the user class has a reference to it which **DELEGATES** all the work. Our User.java works perfectly without a single if-else block. Also, if we need the payment method to change just pass the new payment method to setPaymentMethod(). Boom! You changed it. Life became easier, now you can get out of the dark room sitting in front of a machine all day and night and instead have some late night boogie woogie(by which I mean binge watching and eating junk food).

The thing about design patterns is that you won't notice its significance immediately. The significance on your code is intrinsic. Most of the time its overkill for a simple software but when it works, oh how well it works is beyond imagination. Now that you know Strategy Pattern you should be able to find it popping out almost everywhere. One popular place that its implemented is right in the Java API's **Collection Framework**. Google for it by writing **Usage of Comparator** and try to match with what we just did on the problem we solved. Till next time. Ciao. 