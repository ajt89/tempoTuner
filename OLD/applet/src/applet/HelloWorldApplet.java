package applet;
import java.applet.*;
import java.awt.*;
import java.awt.event.*;

import javax.swing.AbstractButton;
import javax.swing.BoxLayout;
import javax.swing.JApplet;
import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;

public class HelloWorldApplet extends JApplet implements ActionListener { 
	CheckboxGroup radioGroup; 
	Checkbox radio1; 
	Checkbox radio2; 
	Checkbox radio3;
	
	Button slowButton;
	Button mediumButton;
	Button fastButton;
	
	JLabel appTitle;
	JLabel bpmTitle;
	JLabel hipsterTitle;
	JLabel genreTitle;
	JLabel numberSongsTitle;
	
	public void init(){
		 
	        //Set up the content pane.
	    //    addComponentsToPane(getContentPane());
	 
		
        setLayout(new FlowLayout()); 
        slowButton = new Button("Slow"); 
        mediumButton = new Button("Medium");
        fastButton = new Button("Fast");
        
        appTitle = new JLabel("Tempo Tuner");
        bpmTitle = new JLabel("BPM");
        hipsterTitle = new JLabel("Hipster-ness");
        genreTitle = new JLabel("Genre");
        numberSongsTitle = new JLabel("Maximum # of Songs");
        
        radioGroup = new CheckboxGroup(); 
        radio1 = new Checkbox("Red", radioGroup,false); 
        radio2 = new Checkbox("Blue", radioGroup,true); 
        radio3 = new Checkbox("Green", radioGroup,false); 
        
        add(appTitle);
        add(bpmTitle);
        add(hipsterTitle);
        add(genreTitle);
        add(numberSongsTitle);
        
        add(slowButton); 
        add(mediumButton); 
        add(fastButton); 
        
        add(radio1); 
        add(radio2); 
        add(radio3);

        // Attach actions to the components 
        //okButton.addActionListener(this); 
        //wrongButton.addActionListener(this);
          
         
	}
	
	private static void addAButton(String text, Container container) {
        JButton button = new JButton(text);
        button.setAlignmentX(Component.CENTER_ALIGNMENT);
        container.add(button);
    }
	
	public static void addComponentsToPane(Container pane) {
        pane.setLayout(new BoxLayout(pane, BoxLayout.Y_AXIS));
 
        addAButton("Button 1", pane);
        addAButton("Button 2", pane);
        addAButton("Button 3", pane);
        addAButton("Long-Named Button 4", pane);
        addAButton("5", pane);
    }
 
	
	 // Here we will show the results of our actions 
    public void paint(Graphics g) { 
    	//g.drawString ("Hello World", 25, 50);
    	// If the radio1 box is selected then radio1.getState() will 
    	// return true and this will execute 
    	//if (radio1.getState()) 
    	//	g.setColor(Color.red); // If it was not red we'll try if it is blue 
    	//else if (radio2.getState()) 
    	//	g.setColor(Color.blue); 
    	// Since always one radiobutton must be selected it must be green 
    	//else g.setColor(Color.green);

    	// Now that the color is set you can get the text out the TextField like this 
    	//g.drawString(appTitle.getText(),20,100);
    	
    }
    
    // When the button is clicked this method will get automatically called 
    // This is where you specify all actions.

	public void actionPerformed(ActionEvent evt) { 
		// Here we will ask what component called this method 
		//if (evt.getSource() == okButton)  
			// So it was the okButton, then let's perform his actions 
			// Let the applet perform Paint again. 
			// That will cause the aplet to get the text out of the textField 
			// again and show it. 
			repaint();
			// Actions of the wrongButton 
             //else if (evt.getSource() == wrongButton)  {
            	 // Change the text on the button for fun 
            	 //wrongButton.setLabel("Not here!"); 
            	 // Changes the text in the TextField 
            	 //nameField.setText("That was the wrong button!"); 
            	 // Lets the applet show that message. 
            	// repaint(); 
           //  } 
        }
    
}
