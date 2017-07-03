---
title: Lamdas and Functional Interfaces in Java 8
description: Java 8 introduces us with the concept of lambdas for functional programming and provides us with out of the box functional interfaces to make our lives easier.
image: img/posts/2017-06-11-java-8-lambda-and-functional-interfaces/batman_slaps.jpg
comments: true
---
![Strategy meme](img/posts/2017-06-11-java-8-lambda-and-functional-interfaces/batman_slaps.jpg "Strategy meme")

Lambda expressions are said to be the biggest feature in Java 8. It facilitates functional programming in contrast to the usual object oriented approach that Java is so famous for. 

### Why we need lambda expressions?
In order to answer this question we need to first understand why we do programming. By programming we mean that we, us humans, give a set of instructions to the computer to follow. This is very important to understand humans write the code, humans debug the code and humans need to understand the code. The more readable the code is the overall software development process is easier. Now this is where functional programming comes in. Functional programming is easier to understand and much more compelling. Lambda expressions provide a way to do functional programming, where we pass in behavior as parameters instead of objects. If it still seems unclear(it should seem unclear, don't worry) then I hope the following example will help. 

### Doing things the old way.
Ok, so our job today is to sort an array of Nodes with integer values in ascending order. Pretty simple. We won't be writing our sorting code but let an implementation of Java's **Comparator** interface do the work. I am writing the code here but in order to go in depth on using **Comparator** go to this <a href="https://www.javatpoint.com/Comparator-interface-in-collection-framework" title="comparator tutorial">Link</a>.

Our Main.java file:

{% highlight java linenos%}

/**
 *
 * @author Shabab
 */
public class Main {
    
    public static void main(String[] args) {
        Node array[] = new Node[5];
        for(int c = array.length - 1, i = 0; c >= 0; c--, i++)
        {
            array[i] = new Node(c);
        }
        //array = node objects with values [4,3,2,1,0] 

        //making an object of a comparator which has the logic to sort objects of Node
        MyNodeComparator comparator = new MyNodeComparator();
        //pass the comparator that we just made
        Arrays.sort(array, comparator);
        //print the sorted values
        for(int c = 0; c < array.length; c++)
        {
            System.out.println(array[c]);
        }
    }
    
}

{% endhighlight %} 

Our Node class, Node.java.

{% highlight java linenos%}
/**
 *
 * @author Shabab
 */

public class Node {
    private int value;

    public Node(int value) {
        this.value = value;
    }

    public int getValue() {
        return value;
    }
    
    

    @Override
    public String toString() {
        return String.valueOf(value);
    }
    
    
}


{% endhighlight %} 


Our comparator implementation, i.e, MyNodeComparator.java


{% highlight java linenos%}

/**
 *
 * @author Shabab
 */
public class MyNodeComparator implements Comparator<Node>{
    
    //here is the logic to compare two instances of nodes.
    @Override
    public int compare(Node o1, Node o2) {
        return o1.getValue() - o2.getValue();
    }
    
    
}

{% endhighlight %} 

Ok, do you see the problem here? Look at the main method. We had to make an object to pass in to **Arrays.sort** method which gave it the logic to sort the array. Since we are making an object then obviously we need to make a class, here it is **MyNodeComparator** class. There we override only one method. The method which provides the logic to sort. **SO MUCH WORK FOR ONLY ONE METHOD!!!!**. 

Sure, we can shorten it out. We don't need to make a class for **Arrays.sort** actually. 

{% highlight java linenos%}

Arrays.sort(array, new Comparator<Node>(){
    @Override
    public int compare(Node o1, Node o2) {
        return o1.getValue() - o1.getValue();
    }
});

{% endhighlight %}

This is called passing inline interface implementation so we didn't have to make a class for implementation of Comparator interface. But the code looks ugly and it seems a bit of an overhead for such a simple logic. Remember, we program for humans as humans. So if our code is hard to understand then there is something wrong. Anyways, Lambda expressions are here to the rescue. We just shorten the inline implementation of interface as you will see. 

The best part about the introduction of Lambdas are that they are completely compatible with the object oriented way of doing things. We see that there is only **ONE** method to implement. The method takes **TWO** objects of nodes and it returns an integer. So lets change it to lambdas.

{% highlight java linenos%}

Arrays.sort(array, (o1, o2) -> {
    return o1.getValue() - o2.getValue();
});

{% endhighlight %}

Boom shakalaka and we are done. Its simple, very concise and very readable. Since our collection, which is an array of **Node** type over here so the compiler is smart enough to understand that the two parameters 'o1' and 'o2' are also of Node types. Hence we didn't have to write 'Node o1' and 'Node o2' as parameters. Also we had to give the arrow sign '->' to hint that it is a lambda expression here and then we are giving a block of code to execute. One important thing to note here is that we are not introducing a new scope in this block. When we were using inline interface implementation we were introducing a new scope but here with lambdas we are not. So it kind of makes things efficient during runtime. 

One thing that you should notice is that we are not declaring data types in lambdas. So if there is a method in the interface which takes in **TWO** paramaters of **ANY** type then we have an error, because simply, the compiler gets confused which method to call. Therefore, Lambdas work best with interfaces with only one method, in our case in **Comparator** interface the **compare** method. 

So everytime we want to use lambdas we have to make interfaces with only one method? Nope, this is where **Functional Interfaces** come in. Java 8 has a huge package of already built in interfaces that provides methods in different combinations and different return types that you might need. We will look into that in the immediate tutorial.

Phew, that is a really big article. We aren't done yet though. We just saw how we can use lambdas in our code. But we still gotta learn how to design our classes to use lambdas to get the true functional feels. See you in the next article then. 